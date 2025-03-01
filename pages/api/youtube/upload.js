// pages/api/youtube/upload.js
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

// Inizializza Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Imposta le variabili per OAuth2 (clientId, clientSecret e redirectUri)
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { userId, driveFileId, postId } = req.body;
  if (!userId || !driveFileId) {
    res.status(400).json({ error: "Missing userId or driveFileId" });
    return;
  }

  // Recupera il token salvato per l'utente dalla tabella youtube_tokens
  const { data: tokenData, error: tokenError } = await supabase
    .from("youtube_tokens")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (tokenError || !tokenData) {
    res.status(400).json({ error: "Token YouTube non trovato per l'utente" });
    return;
  }

  // Imposta le credenziali dell'OAuth2 client
  oauth2Client.setCredentials({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    scope: tokenData.scope,
    token_type: tokenData.token_type,
    expiry_date: Date.now() + tokenData.expires_in * 1000, // approssimazione
  });

  // Usa Google Drive API per scaricare il file
  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  let fileBuffer;
  try {
    const driveRes = await drive.files.get(
      { fileId: driveFileId, alt: 'media' },
      { responseType: 'arraybuffer' }
    );
    fileBuffer = Buffer.from(driveRes.data);
  } catch (err) {
    console.error("Errore durante il download dal Drive:", err);
    res.status(500).json({ error: "Errore durante il download dal Drive" });
    return;
  }

  // Ora utilizza YouTube Data API per caricare il video
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  try {
    const youtubeRes = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: "Video Caricato da ReelSync", // Potresti usare dati del post
          description: "Video caricato automaticamente da ReelSync",
          tags: ['ReelSync', 'Automated Upload'],
          categoryId: '22', // Categoria ad esempio "People & Blogs"
        },
        status: {
          privacyStatus: 'private', // o "public" se preferisci
        },
      },
      media: {
        mimeType: 'video/*', // Potresti determinare il tipo esatto in base al file
        body: fileBuffer,
      },
    });

    // Se desideri, aggiorna il record del post (ad es. salvare youtubeVideoId) qui
    // ...

    res.status(200).json({ message: "Video caricato su YouTube", videoData: youtubeRes.data });
  } catch (err) {
    console.error("Errore durante l'upload su YouTube:", err);
    res.status(500).json({ error: "Errore durante l'upload su YouTube" });
  }
}

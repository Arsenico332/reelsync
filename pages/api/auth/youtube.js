// pages/api/auth/youtube.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const code = req.query.code;
  const state = req.query.state; // user_id
  if (!code) {
    res.status(400).json({ error: "Missing code" });
    return;
  }
  
  const client_id = process.env.YOUTUBE_CLIENT_ID;
  const client_secret = process.env.YOUTUBE_CLIENT_SECRET;
  const redirect_uri = process.env.YOUTUBE_REDIRECT_URI || "http://localhost:3000/api/auth/youtube";

  const tokenUrl = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("redirect_uri", redirect_uri);
  params.append("grant_type", "authorization_code");

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      res.status(400).json(tokenData);
      return;
    }

    // Upsert al posto di insert
    // 'onConflict: "user_id"' assicura che, se esiste un record con lo stesso user_id, verrà aggiornato.
    const { data, error } = await supabase
      .from("youtube_tokens")
      .upsert(
        {
          user_id: state,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: tokenData.expires_in,
          scope: tokenData.scope,
          token_type: tokenData.token_type,
        },
        {
          onConflict: "user_id",
        }
      );
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Reindirizza alla dashboard con un messaggio di successo
    res.redirect("/?connected=true");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

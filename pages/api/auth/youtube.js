// pages/api/auth/youtube.js
export default async function handler(req, res) {
    const code = req.query.code;
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
  
    // In un'app reale, qui salveresti i token (access token e refresh token)
    // associandoli all'utente nel database.
    res.status(200).json(tokenData);
  }
  
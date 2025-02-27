// pages/api/connect-youtube.js
export default async function handler(req, res) {
    const client_id = process.env.YOUTUBE_CLIENT_ID;
    // Il redirect URI deve corrispondere a quello configurato in Google Developer Console
    const redirect_uri = process.env.YOUTUBE_REDIRECT_URI || "http://localhost:3000/api/auth/youtube";
    const scope = encodeURIComponent("https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  
    res.redirect(authUrl);
  }
  
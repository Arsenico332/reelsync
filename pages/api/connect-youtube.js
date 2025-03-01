// pages/api/connect-youtube.js
export default async function handler(req, res) {
  const client_id = process.env.YOUTUBE_CLIENT_ID;
  const redirect_uri = process.env.YOUTUBE_REDIRECT_URI || "http://localhost:3000/api/auth/youtube";
  console.log("Redirect URI:", redirect_uri, encodeURIComponent(redirect_uri));
  const state = req.query.state; // user_id, per esempio
  // Includiamo gli scope per YouTube e Google Drive
  const scopes = encodeURIComponent(
    "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/drive.file"
  );
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scopes}&state=${state}&access_type=offline&prompt=consent`;
  res.redirect(authUrl);
}

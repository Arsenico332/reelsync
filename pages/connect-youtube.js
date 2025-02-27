// pages/connect-youtube.js
import { Container, Typography, Button, Box } from '@mui/material';

const ConnectYouTube = () => {
  const handleConnect = () => {
    // Reindirizza l'utente all'API route che inizia il flusso OAuth
    window.location.href = '/api/connect-youtube';
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Connetti il tuo account YouTube
      </Typography>
      <Typography variant="body1" gutterBottom>
        Clicca sul pulsante sottostante per collegare il tuo account YouTube e autorizzare ReelSync a pubblicare video a tuo nome.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleConnect}>
          Connetti YouTube
        </Button>
      </Box>
    </Container>
  );
};

export default ConnectYouTube;

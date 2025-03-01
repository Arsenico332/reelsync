// pages/connect-youtube.js
import { Container, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ConnectYouTube = () => {
  const { user } = useAuth();

  const handleConnect = () => {
    if (!user) {
      alert("Devi essere loggato per connettere YouTube");
      return;
    }
    // Passa lo user ID come parametro state
    window.location.href = `/api/connect-youtube?state=${user.id}`;
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

import { Container, Typography, Box, Button } from '@mui/material';

const LandingPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Benvenuto in ReelSync
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          La piattaforma per la pubblicazione automatizzata di video su TikTok, Instagram, YouTube e Pinterest.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" href="/login" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button variant="outlined" color="primary" href="/signup">
            Registrati
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          {/* Assicurati di avere un'immagine in /public */}
          <img src="/landing-image.jpg" alt="ReelSync" style={{ maxWidth: '100%' }} />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;

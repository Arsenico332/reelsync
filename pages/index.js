// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Home() {
  const { user, supabase } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h3">Benvenuto in ReelSync</Typography>
        <Typography variant="body1" mt={2}>
          La tua piattaforma per gestire e programmare la pubblicazione di video su vari social.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

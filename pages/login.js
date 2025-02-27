// pages/login.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { supabase } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  //if (!mounted) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin chiamato");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Risposta login:", { data, error });
      if (error) {
        setError(error.message);
        console.error("Errore login:", error);
      } else if (!data.session) {
        // Se non c'è una sessione, probabilmente l'utente non esiste o le credenziali sono errate
        setError("Nessuna sessione attiva. Verifica le credenziali o registrati.");
        console.warn("Nessuna sessione attiva:", data);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error("Eccezione durante il login:", err);
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Accedi
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary">
            Accedi
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

// pages/index.js
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import { Alert, Snackbar } from '@mui/material';

<meta http-equiv="Content-Security-Policy" 
  content="script-src 'self' https://apis.google.com https://accounts.google.com; object-src 'none';" 
/>
export default function Home() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Controlla se è presente il parametro "connected=true" nella query
    if (router.query.connected === "true") {
      setOpenSnackbar(true);
      // Rimuove il parametro dalla query dopo qualche secondo (opzionale)
      setTimeout(() => {
        router.replace("/", undefined, { shallow: true });
      }, 3000);
    }
  }, [router.query]);

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      {user ? <Dashboard /> : <LandingPage />}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          YouTube collegato con successo!
        </Alert>
      </Snackbar>
    </>
  );
}

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { user, supabase } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Effettua il logout da Supabase
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // Se l'errore indica che la sessione è mancante, possiamo ignorarlo
        if (error.message.includes("Auth session missing")) {
          console.warn("Sessione Supabase già terminata.");
        } else {
          console.error("Errore durante il logout da Supabase:", error.message);
        }
      } else {
        console.log("Logout da Supabase completato.");
      }
    } catch (err) {
      console.error("Eccezione durante il logout da Supabase:", err);
    }

    // 2. Effettua il logout da Google
    try {
      if (window.gapi && window.gapi.auth2) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        if (authInstance) {
          const currentUser = authInstance.currentUser.get();
          if (currentUser && currentUser.isSignedIn()) {
            // Proviamo a chiamare signOut()
            try {
              await authInstance.signOut();
              console.log("Logout da Google completato.");
            } catch (err) {
              // Se l'errore contiene "na", lo logghiamo e procediamo
              if (err && typeof err === "object" && err.error === "na") {
                console.warn("Errore 'na' durante signOut da Google, procedo con disconnect().", err);
                try {
                  await authInstance.disconnect();
                  console.log("Logout da Google completato tramite disconnect().");
                } catch (err2) {
                  console.error("Errore durante disconnect() da Google:", err2);
                }
              } else {
                console.error("Errore durante signOut() da Google:", err);
              }
            }
          } else {
            console.warn("Nessun utente Google autenticato, skip logout da Google.");
          }
        } else {
          console.warn("gapi.auth2.getAuthInstance() non restituisce un'istanza, skip logout da Google.");
        }
      }
    } catch (err) {
      console.error("Eccezione durante il logout da Google:", err);
    }
    
    // 3. Reindirizza alla landing page
    router.push('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ReelSync
        </Typography>
        {user ? (
          <>
            <Button color="inherit" onClick={() => router.push('/')}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button color="inherit">Registrati</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

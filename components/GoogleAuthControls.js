import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

export default function GoogleAuthControls({ onLoginSuccess, onLogoutSuccess }) {
  // Stato per verificare se gapi è stato caricato
  const [gapiLoaded, setGapiLoaded] = useState(false);
  // Stato per tenere traccia se l'utente è autenticato con Google
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);

  useEffect(() => {
    const loadGapi = () => {
      // Carica il modulo client:auth2 e inizializza con il Client ID e gli scope desiderati
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.auth2.init({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly"
          });
          console.log("gapi.auth2 inizializzato correttamente (GoogleAuthControls).");
          setGapiLoaded(true);
          // Verifica lo stato di autenticazione subito dopo l'inizializzazione
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (authInstance) {
            setIsGoogleLoggedIn(authInstance.isSignedIn.get());
          }
        } catch (err) {
          console.error("Errore durante l'inizializzazione di gapi.auth2 (GoogleAuthControls):", err);
        }
      });
    };

    // Se gapi non è presente, caricalo
    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = loadGapi;
      document.body.appendChild(script);
    } else {
      loadGapi();
    }
  }, []);

  // Funzione per eseguire il login con Google (forzando il prompt di consenso)
  const handleLogin = async () => {
    if (!gapiLoaded) {
      console.error("gapi non è ancora stato caricato.");
      return;
    }
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) {
      console.error("gapi.auth2.getAuthInstance() non è disponibile.");
      return;
    }
    try {
      // Forza il prompt di consenso per ottenere i permessi Drive
      await authInstance.signIn({ prompt: 'consent' });
      console.log("Login con Google completato.");
      setIsGoogleLoggedIn(true);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error("Errore durante il login con Google:", err);
    }
  };

  // Funzione per eseguire il logout da Google
  const handleLogout = async () => {
    if (!gapiLoaded) {
      console.error("gapi non è ancora stato caricato.");
      return;
    }
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) {
      console.error("gapi.auth2.getAuthInstance() non è disponibile.");
      return;
    }
    try {
      await authInstance.signOut();
      console.log("Logout da Google completato.");
      setIsGoogleLoggedIn(false);
      if (onLogoutSuccess) onLogoutSuccess();
    } catch (err) {
      console.error("Errore durante il logout da Google:", err);
    }
  };

  return (
    <div>
      {isGoogleLoggedIn ? (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin} disabled={!gapiLoaded}>
          Login con Google (Drive)
        </Button>
      )}
    </div>
  );
}

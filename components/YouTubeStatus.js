import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const YouTubeStatus = () => {
  const { supabase, user } = useAuth();
  const router = useRouter();
  
  // Stato per verificare se YouTube è collegato e se stiamo ancora caricando i dati
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval; // dichiarazione della variabile per il polling

    // Funzione asincrona che controlla lo stato della connessione YouTube
    async function checkYoutubeConnection() {
      if (!user) return;
      try {
        // Utilizziamo .maybeSingle() per ottenere un record o null se non esiste
        const { data, error } = await supabase
          .from('youtube_tokens')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error("Errore nel controllo del token:", error);
        }
        
        // Se troviamo un record con un access_token, consideriamo YouTube collegato
        if (data && data.access_token) {
          setYoutubeConnected(true);
          setLoading(false);
          // Interrompiamo il polling
          clearInterval(interval);
        } else {
          // Se non troviamo il token, manteniamo lo stato non collegato
          setYoutubeConnected(false);
          setLoading(false);
        }
      } catch (err) {
        console.error("Eccezione nel controllo YouTube:", err);
        setLoading(false);
      }
    }

    // Eseguiamo subito il controllo
    checkYoutubeConnection();

    // Impostiamo il polling ogni 3 secondi
    interval = setInterval(() => {
      checkYoutubeConnection();
    }, 3000);

    // Pulizia dell'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, [user, supabase]);

  // Se ancora in caricamento, mostriamo un messaggio di attesa
  if (loading) {
    return <Typography>Verifica dello stato YouTube...</Typography>;
  }

  return (
    <Box sx={{ my: 2 }}>
      {youtubeConnected ? (
        <Typography>YouTube è collegato!</Typography>
      ) : (
        <>
          <Typography>YouTube non è collegato.</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Reindirizza all'endpoint OAuth, passando lo user ID come parametro "state"
              router.push(`/api/connect-youtube?state=${user.id}`);
            }}
            sx={{ mt: 1 }}
          >
            Connetti YouTube
          </Button>
        </>
      )}
    </Box>
  );
};

export default YouTubeStatus;

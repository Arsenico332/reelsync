// components/UploadForm.js
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UploadForm = ({ driveFileId }) => {
  const { user, supabase } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUploadToYouTube = async () => {
    if (!driveFileId) {
      alert("Nessun file selezionato da Google Drive.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/youtube/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          driveFileId,
          // eventualmente postId e altri dettagli
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Video caricato con successo su YouTube!");
        console.log(data);
      } else {
        alert("Errore nell'upload: " + data.error);
      }
    } catch (err) {
      console.error("Errore nella chiamata API:", err);
      alert("Errore durante l'upload");
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6">Dettagli Video (facoltativi)</Typography>
      <TextField
        label="Titolo"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Descrizione"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUploadToYouTube}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Caricamento in corso..." : "Carica su YouTube"}
      </Button>
    </Box>
  );
};

export default UploadForm;

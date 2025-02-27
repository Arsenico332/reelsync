// pages/upload.js
import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import VideocamIcon from '@mui/icons-material/Videocam';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const [socials, setSocials] = useState({
    tiktok: false,
    instagram: false,
    youtube: false,
    pinterest: false,
  });

  // Gestione del caricamento del file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Gestione della submit del form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Per ora stampiamo in console i dati raccolti
    console.log('Titolo:', title);
    console.log('Descrizione:', description);
    console.log('Schedule:', schedule);
    console.log('Sociali selezionati:', socials);
    console.log('File:', file);
    // Qui potrai implementare la logica per inviare i dati al backend e schedulare il caricamento
    alert('Contenuto programmato (la logica di upload verrà implementata in seguito)');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carica Video/Immagine
      </Typography>
      <Grid container spacing={4}>
        {/* Sezione Caricamento File */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <input
              type="file"
              accept="video/*,image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="upload-file"
            />
            <label htmlFor="upload-file" style={{ cursor: 'pointer' }}>
              <Button variant="contained" component="span">
                Trascina o clicca per caricare
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                {file.name}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Sezione Anteprima e Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5">
                {title ? title : 'Anteprima Titolo'}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {description ? description : 'Anteprima descrizione'}
              </Typography>
              {filePreview && (
                <Box sx={{ mt: 2 }}>
                  {file.type.startsWith('image/') ? (
                    <img
                      src={filePreview}
                      alt="Anteprima"
                      style={{ maxWidth: '100%' }}
                    />
                  ) : file.type.startsWith('video/') ? (
                    <video
                      src={filePreview}
                      controls
                      style={{ maxWidth: '100%' }}
                    />
                  ) : null}
                </Box>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
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
            <TextField
              label="Data e Ora di pubblicazione"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Seleziona i social:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={socials.tiktok}
                  onChange={(e) =>
                    setSocials({ ...socials, tiktok: e.target.checked })
                  }
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <VideocamIcon sx={{ mr: 1 }} /> TikTok
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={socials.instagram}
                  onChange={(e) =>
                    setSocials({ ...socials, instagram: e.target.checked })
                  }
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InstagramIcon sx={{ mr: 1 }} /> Instagram
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={socials.youtube}
                  onChange={(e) =>
                    setSocials({ ...socials, youtube: e.target.checked })
                  }
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <YouTubeIcon sx={{ mr: 1 }} /> YouTube
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={socials.pinterest}
                  onChange={(e) =>
                    setSocials({ ...socials, pinterest: e.target.checked })
                  }
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PinterestIcon sx={{ mr: 1 }} /> Pinterest
                </Box>
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Programma Caricamento
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Upload;

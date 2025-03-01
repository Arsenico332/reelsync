// components/GooglePicker.js
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

export default function GooglePicker({ isGoogleLoggedIn, googleToken, onFileSelected }) {
  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);

  useEffect(() => {
    const loadPicker = () => {
      window.gapi.load('picker', () => {
        setPickerApiLoaded(true);
        console.log("Picker API caricata (GooglePicker).");
      });
    };

    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = loadPicker;
      document.body.appendChild(script);
    } else {
      loadPicker();
    }
  }, []);

  const createPicker = () => {
    if (!isGoogleLoggedIn) {
      console.warn("Non sei autenticato con Google, non posso creare il Picker.");
      return;
    }
    if (!googleToken) {
      console.warn("Token Google non disponibile. Verifica che il login sia stato completato correttamente.");
      return;
    }

    console.log("Utilizzo del token Google:", googleToken);

    const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
    // Se vuoi limitare ai file video, decommenta la riga seguente:
    // view.setMimeTypes("video/*");

    const picker = new window.google.picker.PickerBuilder()
      .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
      .setAppId(process.env.NEXT_PUBLIC_GOOGLE_APP_ID)
      .setOAuthToken(googleToken)
      .addView(view)
      .setCallback((data) => {
        console.log("Picker callback data:", data);
        if (data.action === window.google.picker.Action.PICKED) {
          const fileId = data.docs[0].id;
          console.log("File selezionato:", fileId);
          onFileSelected(fileId);
        } else {
          console.warn("Picker chiuso o azione diversa da PICKED:", data.action);
        }
      })
      .build();

    picker.setVisible(true);
  };

  return (
    <div>
      <Typography variant="h6">Seleziona un file da Google Drive</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={createPicker}
        disabled={!pickerApiLoaded || !isGoogleLoggedIn || !googleToken}
      >
        Seleziona File
      </Button>
    </div>
  );
}

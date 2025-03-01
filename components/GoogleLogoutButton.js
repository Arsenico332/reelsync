import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function GoogleLogoutButton({ onLogoutSuccess }) {
  const router = useRouter();

  const handleGoogleLogout = async () => {
    try {
      if (window.gapi && window.gapi.auth2) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        if (authInstance) {
          await authInstance.signOut();
          console.log("Logout da Google completato.");
          if (onLogoutSuccess) {
            onLogoutSuccess();
          }
          localStorage.removeItem('googleToken');
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Errore durante il logout da Google:", error);
    }
  };
  

  return (
    <Button variant="contained" color="secondary" onClick={handleGoogleLogout}>
      Logout da Google
    </Button>
  );
}

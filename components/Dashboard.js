// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import GoogleLoginButton from './GoogleLoginButton';
import GooglePicker from './GooglePicker';
import GoogleLogoutButton from './GoogleLogoutButton';

export default function Dashboard() {
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);
  const [driveFileId, setDriveFileId] = useState(null);
  const [googleToken, setGoogleToken] = useState(null);

  // Al montaggio, controlla se c'è un token salvato nel localStorage
  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      setIsGoogleLoggedIn(true);
      setGoogleToken(token);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    console.log("Autenticazione Google completata. Token:", token);
    setIsGoogleLoggedIn(true);
    setGoogleToken(token);
    localStorage.setItem('googleToken', token);
  };

  const handleLogoutSuccess = () => {
    console.log("Logout da Google completato.");
    setIsGoogleLoggedIn(false);
    setGoogleToken(null);
    localStorage.removeItem('googleToken');
  };

  const handleFileSelected = (fileId) => {
    console.log("File selezionato dal Picker:", fileId);
    setDriveFileId(fileId);
  };

  return (
    <Container style={{ padding: '1rem' }}>
      <Typography variant="h4">Dashboard</Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Autenticazione con Google (Drive)</Typography>
        {isGoogleLoggedIn ? (
          <GoogleLogoutButton onLogoutSuccess={handleLogoutSuccess} />
        ) : (
          <GoogleLoginButton onLoginSuccess={handleLoginSuccess} isGoogleLoggedIn={isGoogleLoggedIn} />
        )}
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Seleziona File dal tuo Drive</Typography>
        {/* Passa il token anche qui */}
        <GooglePicker
          isGoogleLoggedIn={isGoogleLoggedIn}
          googleToken={googleToken}
          onFileSelected={handleFileSelected}
        />
      </Box>
      {driveFileId && (
        <Typography variant="body1">
          Hai selezionato il file con ID: {driveFileId}
        </Typography>
      )}
    </Container>
  );
}

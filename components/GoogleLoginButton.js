// components/GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleLoginButton({ onLoginSuccess, isGoogleLoggedIn }) {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log("Successo! Token JWT di Google:", credentialResponse.credential);
        // Salviamo il token nel localStorage
        localStorage.setItem('googleToken', credentialResponse.credential);
        // Chiamiamo il callback per notificare il genitore
        if (onLoginSuccess) {
          onLoginSuccess(credentialResponse.credential);
        }
      }}
      onError={() => {
        console.log("Errore durante il login con Google");
      }}
    />
  );
}

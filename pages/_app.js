// pages/_app.js
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from '../theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;

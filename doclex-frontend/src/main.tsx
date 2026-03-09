import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

// FIX: Import the CSS file directly like this!
// Note: If main.tsx and index.css are in the same folder, just use './index.css'
import "./index.css"; 

createRoot(document.getElementById('root')!).render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    autoHideDuration={3000}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
);
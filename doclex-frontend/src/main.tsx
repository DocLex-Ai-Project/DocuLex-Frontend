
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SnackbarProvider } from "notistack";

import { BrowserRouter } from "react-router-dom";

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
 
    
)

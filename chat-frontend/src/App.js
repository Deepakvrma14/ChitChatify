// routes
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components

function App() {
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        key={vertical + horizontal}
      >
        <Alert severity={severity} sx={{width:"100%"}} >
        {message}
        </Alert>
        
      </Snackbar>
    </>
  );
}

export default App;

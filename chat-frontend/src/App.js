// routes
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
import { useSelector } from "react-redux";
// components

function App() {
  const {open, severity, message} = useSelector((state)=> state.appState.snackbar);
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
      <Snackbar open={open} autoHideDuration={5000}>
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

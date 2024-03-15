// routes
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./app/features/appSlice";
// components

function App() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector(
    (state) => state.appState.snackbar
  );
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
      {message && open ? (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClick={() => {
            dispatch(closeSnackbar());
          }}
        >
          <Alert
            severity={severity}
            sx={{ width: "100%" }}
            onClick={() => {
              dispatch(closeSnackbar());
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;

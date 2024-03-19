// routes
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./app/features/appSlice";
import {io} from "socket.io-client";
// components

function App() {
  const dispatch = useDispatch();
  const socket = io("http://localhost:3001");
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

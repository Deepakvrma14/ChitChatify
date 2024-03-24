// routes
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./app/features/appSlice";
import { io } from "socket.io-client";
import { useEffect } from "react";
// components

function App() {
  const dispatch = useDispatch();
  // todo: remove below code as below code is part of code used while learning sockets 
  const socket = io("http://localhost:3001");
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`user ${socket.id} is connected`); 
    });
    socket.on("welcome", (msg) => {
      console.log(msg);
    });
    socket.on("exceptSelf", (msg) => console.log(msg));

    return () => {
      socket.disconnect();
    };
    
  }, []);

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

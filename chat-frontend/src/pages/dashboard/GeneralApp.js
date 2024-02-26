import { useSelector } from "react-redux";
import {Contact} from "../../components/Contact";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import { Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.appState);
  
  // store->app->sidebar->open
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%"
      }}
    >
      {/* Chats */}     
      <Chats />
     
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ?  "calc(100vw - 737px)" : "calc(100vw - 420px)",
          backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper,
        }}
      >

        {/* Conversation */}
        <Conversation />
      </Box>
        {/* Contact */}
        { sidebar.open && <Contact/> }
    </Stack>
  );
};

export default GeneralApp;

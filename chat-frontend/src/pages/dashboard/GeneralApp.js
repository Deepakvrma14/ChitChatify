import { useSelector } from "react-redux";
import {Contact} from "../../components/Contact";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import { Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
console.log(sidebar);
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
          width: "calc(100vw - 420px)",
          backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper,
        }}
      >

        {/* Conversation */}
        <Conversation />
      </Box>
        {/* Contact */}
        { 1 && <Contact/> }
    </Stack>
  );
};

export default GeneralApp;

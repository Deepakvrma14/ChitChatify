import { useSelector } from "react-redux";
import {Contact} from "../../components/Contact";
import { Media } from "../../components/Media";
import { Starred } from "../../components/Starred";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import { Stack, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ChatsTeardrop } from "phosphor-react";
import NoChat from "../../assets/Illustration/NoChat";


const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chat_type, room_id } = useSelector((store) => store.appState);
  console.log(sidebar);
  const type = sidebar.type;
  console.log(type);
  // store->app->sidebar->open
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        height: "100vh"
      }}
    >
      {/* Chats */}     
      <Chats />
     
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ?  "calc(100vw - 730px)" : "calc(100vw - 420px)",
          
          backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper,
        }}
      >

        {/* Conversation */}
        {chat_type === "individual" && room_id !== null ? <Conversation/> : 
          <Stack sx={{height:"100%", width:"100%"}}  alignItems={"center"} justifyContent={"center"} spacing={3} direction={"column"}>
            <NoChat/>
            {/* <ChatsTeardrop size={52} /> */}
            <Typography variant="subtitle2" >
              select a conversation or start a new one
            </Typography>
          </Stack>
         }
      </Box>
        {/* Contact */}
        
        { sidebar.open && (type === 'CONTACT' ? <Contact/> : type === 'MEDIA' ? <Media/> : type=== 'STARRED' ? <Starred/> : null ) }

    </Stack>
  );
};

export default GeneralApp;

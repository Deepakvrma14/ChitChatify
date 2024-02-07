import React from "react";
import Chats from "./Chats";
import { useTheme } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation/Conversation";
const GeneralApp = () => {
  const theme = useTheme();
  return (
    
      <Stack direction="row" sx={{ width: "100%" }}>
        <Chats />
        <Box
          sx={{
            height: "100%",
            width: "calc(100% - 300px)",
            backgroundColor: theme.palette.mode === "light" ?"#fff" : theme.palette.background.default,
          }}
        >
          {/* convo */}
          
          <Conversation />
        </Box>
      </Stack>
    
  );
};

export default GeneralApp;

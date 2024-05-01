import { Box, Stack, Avatar, Typography, Badge, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { StyledBadge } from "../../components/customMui/StyledBadge";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../../app/features/appSlice";
import { Divide } from "phosphor-react";
import { SetCurrentConversation } from "../../app/features/conversationSlice";

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <><Box
      
      sx={{
        width: "100%",
        borderRadius: 1,
        
   
      }}
      p={2}
      onClick={() => {
        // console.log("working");
        dispatch(SelectConversation({ room_id: id }));
        dispatch(SetCurrentConversation(id));
        console.log(`id is ${
          id
        }`);
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={online ? "dot" : ""}
            >
              <Avatar src={img} />
            </StyledBadge>
          </Stack>
          <Stack spacing={0.3} direction={"column"}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
            variant="caption"
          >
            {time}
          </Typography>
          <Badge color="primary"  badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
    <Divider style={{ width: '50%', margin: '0 auto' }}/>    </>
    
  );
};

export default ChatElement;

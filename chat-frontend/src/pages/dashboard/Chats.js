import {
  Box,
  IconButton,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import {
  CircleDashed,
  MagnifyingGlass,
  ArchiveBox,
  Users,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import ChatElement from "./ChatElement";
import { ChatList } from "../../data";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./custom/CustomMaterialUI";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
const user_id = window.localStorage.getItem("user_id");
const Chats = () => {
  const theme = useTheme();

  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      // data=> existing users list coming from backend
    });
  }, []);
  const { conversations } = useSelector(
    (state) => state.conversationState.direct_chat
  );
  return (
    <>
      <Stack
        spacing={2}
        direction={"column"}
        sx={{
          position: "relative",
          width: 315,

          height: "98vh",
          borderRadius: "20px",
          margin: "1vh",

          spacing: 1,
        }}
      >
        <Box
        
          sx={{
            borderRadius: "20px",
            border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
            padding: "1vh",
            height:70,
            marginBottom: "1vh",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f6f6f6"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={2}
            p={1}
          >
            <Typography variant="h5" letterSpacing={1}>
              ChitChattify
            </Typography>

            <div
              style={{
                borderRadius: "50%",
                background: theme.palette.background.logo,
                display: "inline-flex",
              }}
            >
              <IconButton aria-label="Archive">
                <ArchiveBox
                  size={22}
                  color={theme.palette.primary.contrastText}
                />
              </IconButton>
            </div>
          </Stack>
        </Box>
        {/* <Divider /> */}
        <Box
          sx={{
            borderRadius: "20px",
            border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
            padding: "1vh",
            flexGrow: 1,
            overflowX: "hidden",
            scrollbarColor: theme.palette.primary.dark,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f6f6f6"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              flexGrow: 1,
              height: "100%",
              overflowX: "hidden",
              scrollbarColor: theme.palette.primary.dark,
            }}
            spacing={2}
          >
            {/* <Stack spacing={2.4}>
              <Typography
                variant="subtitle"
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
              >
                Pinned
              </Typography>
              {ChatList.filter((el) => el.pinned).map((el) => {
                return <ChatElement {...el} key={el.id} />;
              })}
            </Stack> */}
            <Stack spacing={2.4} marginTop={2}>
              <Typography
                fontWeight={5}
                fontSize={15}
                p={2}
                variant="subtitle"
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
              >
                All Chats
              </Typography>
              {conversations
                .filter((el) => !el.pinned)
                .map((el) => {
                  return <ChatElement {...el} key={el.id} />;
                })}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Chats;

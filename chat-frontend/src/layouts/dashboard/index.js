import React, { useEffect } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import MobileScreenComponent from "./MobileScreenComponent.js";
import { socket, connectSocket } from "../../socket.js";
import {
  SelectConversation,
  showSnackbar,
} from "../../app/features/appSlice.js";
import {
  AddDirectConversation,
  AddDirectMessage,
  SetCurrentConversation,
  UpdateDirectConversation,
} from "../../app/features/conversationSlice.js";
const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.authState);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { conversations, current_conversation } = useSelector(
    (state) => state.conversationState.direct_chat
  );

  const dispatch = useDispatch();

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn && user_id ) {
      connectSocket(user_id);
      // console.log(socket);
      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("accept_friend", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      // socket.on("incomming_message", (data) =>{
      //   console.log(`received data is ${data}`);
      // })
      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);

        console.log(`to user is  ${message.to._id} `);
        console.log(`from user is  ${message.from._id} `);

        
        // check if msg we got is from currently selected conversation
        if (current_conversation === data.conversation_id) {
          console.log(`inside add direct message`);
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to._id === user_id,
              outgoing: message.from._id === user_id,
            })
          );
        }else {
          console.log("Skipped add direct message");
          console.log(socket);
        }
      });
      socket.on("start_chat", (data) => {
        console.log(data);
        const existingConvo = conversations.find((el) => el._id === data._id);
        if (existingConvo) {
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
        

        console.log('Starting chat with conversation id: ', data._id); 

      });
      // cleanup functions
      return () => {
        socket?.off("new_friend_request");
        socket?.off("request_send");
        socket?.off("accept_friend");
        socket?.off("new_message");
        socket?.off("start_chat");
      };
    }else{
      // console.log("socket not connected");
      console.log(`ilogged in is ${isLoggedIn} userid is ${user_id} socket is ${socket}`)
    }
  }, [isLoggedIn, socket]);
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  if (isSmallScreen || isMediumScreen) {
    return <MobileScreenComponent />;
  }
  // old approach
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     window.onload = function () {
  //       if (!window.location.hash) {
  //         window.location = window.location + "#loaded";
  //         window.location.reload();
  //       }
  //     };
  //     // window.reload();
  //     // to make sure socket id is created only if user is logged in that's why using this flow

  //     if (!socket) {
  //       connectSocket(user_id);
  //     }
  //     socket.on("new_friend_request", (data) => {
  //       dispatch(showSnackbar({ severity: "success", message: data.message }));
  //     });
  //     socket.on("request_sent", (data) => {
  //       dispatch(showSnackbar({ severity: "success", message: data.message }));
  //     });
  //     socket.on("accept_friend", (data) => {
  //       dispatch(showSnackbar({ severity: "success", message: data.message }));
  //     });
  //     // cleanup functions
  //     return () => {
  //       socket.off("new_friend_request");
  //       socket.off("request_send");
  //       socket.off("accept_friend");
  //     };
  //   }
  // }, [isLoggedIn, user_id]);

  return (
    <Stack
      direction={"row"}
      overflow={"hidden"}
      sx={{ backgroundColor: theme.palette.background.back }}
    >
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;

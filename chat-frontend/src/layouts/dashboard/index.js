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
import { AddDirectConversation, UpdateDirectConversation } from "../../app/features/conversationSlice.js";
const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.authState);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { conversations } = useSelector(
    (state) => state.conversationState.direct_chat
  );

  const dispatch = useDispatch();

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn && user_id && !socket) {
      connectSocket(user_id);
      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("accept_friend", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
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
      });
      // cleanup functions
      return () => {
        socket?.off("new_friend_request");
        socket?.off("request_send");
        socket?.off("accept_friend");
        socket?.off("start_chat");
      };
    }
  }, [isLoggedIn, user_id, socket, dispatch]);
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
    <Stack direction={"row"} overflow={"hidden"} sx={{backgroundColor:theme.palette.background.back}} >
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;

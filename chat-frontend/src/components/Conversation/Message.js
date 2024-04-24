import { Box, Stack } from "@mui/material";
import {
  TimeLine,
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "./MsgTypes";
import { Chat_History } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { current } from "@reduxjs/toolkit";
import { socket } from "../../socket";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../app/features/conversationSlice";

const Message = () => {
  const dispatch = useDispatch();
  const { conversations, current_messages } = useSelector(
    (state) => state.conversationState.direct_chat
  );
  const { room_id } = useSelector((state) => state.appState);
  const messsageListRef = useRef(null);

  useEffect(() => {
    messsageListRef.current.scrollTop = messsageListRef.current.scrollHeight;
  }, [current_messages]);

  useEffect(() => {
    const current = conversations.find((el) => el.id === room_id);
    
    if (current) {
      socket.emit("get_message", { conversation_id: current.id }, (data) => {
        console.log(data, "list of messages");
        dispatch(FetchCurrentMessages({ messages: data }));
      });
      dispatch(SetCurrentConversation(current));
    }
  }, []);

  return (
    <Stack spacing={3} p={3} ref = {messsageListRef} >
      {current_messages.map((el, index) => {
        switch (el.type) {
          case "divider":
            return <TimeLine el={el} key={el.type} />;

          case "msg":
            switch (el.subtype) {
              case "img":
                return <MediaMsg el={el} key={index} />;
              case "doc":
                return <DocMsg el={el} key={index} />;
              case "link":
                return <LinkMsg el={el} key={index} />;
              case "reply":
                return <ReplyMsg el={el} key={index} />;
              default:
                return <TextMsg el={el} key={index} />;
            }

          default:
            break;
        }
      })}
    </Stack>
  );
};

export default Message;

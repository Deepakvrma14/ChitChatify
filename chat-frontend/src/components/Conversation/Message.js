import { Box, Stack } from "@mui/material";
import {
  TimeLine,
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
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
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [current_messages]);

  useEffect(() => {
    const currentConversation = conversations.find((el) => el.id === room_id);

    if (currentConversation) {
      socket.emit("get_message", { conversation_id: currentConversation.id }, (data) => {
        console.log(data, "list of messages");
        dispatch(FetchCurrentMessages({ messages: data }));
      });
      dispatch(SetCurrentConversation(currentConversation));
    }
  }, [room_id, conversations, dispatch]);

  return (
    <Box ref={messageListRef} sx={{ overflow: "auto", height: "100%" }}>
      <Stack spacing={3} p={3}>
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
                case "Link":
                  return <LinkMsg el={el} key={index} />;
                case "reply":
                  return <ReplyMsg el={el} key={index} />;
                default:
                  return <TextMsg el={el} key={index} />;
              }
            default:
              return null;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;

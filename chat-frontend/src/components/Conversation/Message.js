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
import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import {
  FetchCurrentMessages,
  IncrementPage,
  FetchMessagesForCurrentConversation,
  SetCurrentConversation,
} from "../../app/features/conversationSlice";

const Message = () => {
  const dispatch = useDispatch();
  const {
    conversations,
    current_messages,
    current_conversation,
    currentPage,
    hasMore,
  } = useSelector((state) => state.conversationState.direct_chat);
  const { room_id } = useSelector((state) => state.appState);
  const messageListRef = useRef(null);

  const [page, setPage] = useState(1);
  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [current_messages]);

  // Fetch initial messages when current_conversation changes
  useEffect(() => {
    console.log("Fetching initial messages for current conversation" + current_conversation) ;
    if (current_conversation) {
      console.log("Fetching initial messages for current conversation inside" + current_conversation) ;
      dispatch(FetchMessagesForCurrentConversation({ conversation_id: current_conversation, page: 1 }));
    }
  }, [current_conversation, dispatch]);

  // Socket event to get initial messages
  useEffect(() => {
    const currentConversation = conversations.find((el) => el.id === current_conversation);

    if (currentConversation) {
      socket.emit("get_message", { conversation_id: currentConversation.id }, (data) => {
        dispatch(FetchMessagesForCurrentConversation({ conversation_id: currentConversation.id, page: 1 }));
      });
      dispatch(SetCurrentConversation(currentConversation.id));
    }
  }, [room_id, conversations, current_conversation, dispatch]);

  // Handle infinite scroll to load more messages
  const handleScroll = useCallback(() => {
    if (messageListRef.current.scrollTop === 0 && hasMore) {
      const nextPage = currentPage + 1;
      console.log(`Fetching more messages: currentPage=${currentPage}, nextPage=${nextPage}`);
      dispatch(IncrementPage());
      dispatch(FetchMessagesForCurrentConversation({ conversation_id: current_conversation, page: nextPage }));
    }
  }, [currentPage, hasMore, current_conversation, dispatch]);

  // Set up scroll event listener
  useEffect(() => {
    const messageList = messageListRef.current;
    console.log("Setting up scroll listener");
    if (messageList) {
      messageList.addEventListener("scroll", handleScroll);
      return () => {
        messageList.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <Box ref={messageListRef} sx={{ overflow: "auto", height: "100%" }}>
      <Stack spacing={3} p={3}>
        {current_messages.map((el, index) => {
          switch (el.type) {
            case "divider":
              return <TimeLine el={el} key={el.id} />;
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

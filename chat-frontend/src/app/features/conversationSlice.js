import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
    currentPage: 1,
    hasMore: true,
  },
  group_chat: [],
};

const user_id = window.localStorage.getItem("user_id");
const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      state.direct_chat.conversations = action.payload.conversations.map(
        (conversation) => {
          const otherUser = conversation.participants.find((participant) => {
            return participant._id.toString() !== user_id;
          });
          return {
            id: conversation._id,
            user_id: otherUser._id,
            img: faker.image.avatar(),
            name: `${otherUser.firstName} ${otherUser.lastName}`,
            msg: faker.music.songName(),
            time: "09:45",
            unread: 89,
            pinned: false,
            online: otherUser.status === "online",
          };
        }
      );
    },
    updateDirectConversations(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el._id !== this_conversation._id) {
            return el;
          } else {
            const otherUser = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            return {
              id: this_conversation._id,
              user_id: otherUser._id,
              img: faker.image.avatar(),
              name: `${otherUser.firstName} ${otherUser.lastName}`,
              msg: faker.music.songName(),
              time: "09:45",
              unread: 89,
              pinned: false,
              online: otherUser.status === "online",
            };
          }
        }
      );
    },
    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const otherUser = this_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      state.direct_chat.conversations.push({
        id: this_conversation._id,
        user_id: otherUser._id,
        img: faker.image.avatar(),
        name: `${otherUser.firstName} ${otherUser.lastName}`,
        msg: faker.music.songName(),
        time: "09:45",
        unread: 89,
        pinned: false,
        online: otherUser.status === "online",
      });
    },
    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
      state.direct_chat.current_messages = [];
      state.direct_chat.currentPage = 1;
      state.direct_chat.hasMore = true;
    },
    fetchCurrentMessages(state, action) {
      const { messages, reset } = action.payload;
      const formattedMessages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.message,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      if (reset) {
        state.direct_chat.current_messages = formattedMessages;
      } else {
        state.direct_chat.current_messages = [
          ...formattedMessages,
          ...state.direct_chat.current_messages,
        ];
      }
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.message);
    },
    incrementPage(state) {
      state.direct_chat.currentPage += 1;
    },
    setHasMore(state, action) {
      state.direct_chat.hasMore = action.payload.hasMore;
    },
  },
});

export default slice.reducer;

export const FetchMessagesForCurrentConversation = ({ conversation_id, page = 1 }) => {
  return async (dispatch, getState) => {
    await axios.get(`/user/message/${conversation_id}?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().authState.token}`,
      },
    })
    .then((response) => {
      console.log(`response: ${response.data.messages}`);
      console.log(`Fetching messages for conversation_id: ${conversation_id}, page: ${page}`);
      const data = response.data;

      dispatch(slice.actions.fetchCurrentMessages({ messages: data.messages, reset: page === 1 }));

      if (data.totalPages <= page) {
        dispatch(slice.actions.setHasMore({ hasMore: false }));
      } else {
        dispatch(slice.actions.setHasMore({ hasMore: true }));
      }
    })
    .catch((error) => {
      console.error(`Error fetching messages for conversation_id: ${conversation_id}, page: ${page}`);
      console.error(error);
    });
  };
};

export const IncrementPage = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.incrementPage());
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    console.log(`dispatching add message as ${message}`);
    dispatch(slice.actions.addDirectMessage({ message }));
  };
};

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };
};
export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  };
};
// export const FetchCurrentMessages = ({message}) =>{

// }

export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversations({ conversation }));
  };
};
export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
  };
};
export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
};

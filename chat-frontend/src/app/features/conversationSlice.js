import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
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
            participant._id.toString() !== user_id;
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
  },
});

export default slice.reducer;

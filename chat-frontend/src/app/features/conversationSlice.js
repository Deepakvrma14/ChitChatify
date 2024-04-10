import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: [],
};

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {

    }
})
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const defaultState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  users: [],
  friends: [],
  friendRequests: [],
};
const appSlice = createSlice({
  name: "app",
  initialState: defaultState,
  reducers: {
    // toggle Sidebar
    toggleSidebar(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.requests;
    },
  },
});

export const { toggleSidebar, updateSidebarType } = appSlice.actions;
export default appSlice.reducer;

export function showSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(appSlice.actions.openSnackbar({ message, severity }));
    setTimeout(() => {
      dispatch(appSlice.actions.closeSnackbar());
    }, 4000);
  };
}

export const closeSnackbar = () => async (dispatch, getState) => {
  dispatch(appSlice.actions.closeSnackbar());
};
export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(appSlice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          appSlice.actions.updateFriends({ friends: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          appSlice.actions.updateFriendRequests({
            requests: response.data.data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

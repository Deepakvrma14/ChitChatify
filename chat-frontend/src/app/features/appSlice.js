import { createSlice } from "@reduxjs/toolkit";

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

export const closeSnackbar = () => async (dispatch,getState) =>{
    dispatch(appSlice.actions.closeSnackbar());
}
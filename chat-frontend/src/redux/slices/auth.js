import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});
// exporting of the reducers
export default slice.reducer;

// login actions
export function login(formValues) {
  // formValues: {email, password} only
  // for thunk action, return another fucntion in this
  return async () => {
    await axios.post(// path, body, headers
      "/auth/login",
      {
        ...formValues,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(function(response){
        console.log(response);
    }).catch((error)=>{
        console.log(error);
    }); 
  };
}

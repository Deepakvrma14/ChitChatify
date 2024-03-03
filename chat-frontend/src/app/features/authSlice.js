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
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

// thunk actions :
export function LogOutUser(){
  return async(dispatch, getState)=>{
    dispatch(slice.actions.logOut)({
      isLoggedIn:false,
      token: "",
      
    });
  }
}
export function LogInUser(formValues) {
  // formValues -> {email, pass}
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(slice.actions.logIn({
            isLoggedIn:true,
            token: response.data.token,
            
        }));
        
        console.log(response.data.token);
      })
      .catch(function (error) {
        console.log(error); 
      });
  };
}

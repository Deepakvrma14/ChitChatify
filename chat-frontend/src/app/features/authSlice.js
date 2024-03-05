import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    forgotPassword(state, action) {},
  },
});

export default slice.reducer;

// thunk actions : // redux does thigns sysncronously so these need to perofrmed outside store for async actions ...  to have to have async actions, we use the middlewares to perofrm these

export function forgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axios.post(
      "/auth/forgot-password",
      { ...formValues },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(function (response){
      console.log(response.data);
    }).catch((error) =>{
      console.log(error.response.data.message);
    });
  };
}
export function LogOutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logOut());
    console.log("logout");
  };
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
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        console.log(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

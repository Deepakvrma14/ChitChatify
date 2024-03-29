import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./appSlice";
import { useNavigate } from "react-router-dom";
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
    register(state, action) {},
  },
});

export default slice.reducer;

// thunk actions : // redux does thigns sysncronously so these need to perofrmed outside store for async actions ...  to have to have async actions, we use the middlewares to perofrm these

export function verifyOtp(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/verify-otp",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch((error) => {
        // console.log(formValues);
        // console.log(error);
        {
          error.response
            ? dispatch(
                showSnackbar({
                  severity: "warning",
                  message: error.response.data.message,
                })
              )
            : dispatch(
                showSnackbar({ severity: "warning", message: error.message })
              );
        }
      });
  };
}
export function registerUser(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/register",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );

        const email = encodeURIComponent(formValues.email);

        setTimeout(() => {
          window.location.href = `/auth/verify-otp?email=${email}`;
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        {
          error.response
            ? dispatch(
                showSnackbar({
                  severity: "warning",
                  message: error.response.data.message,
                })
              )
            : dispatch(
                showSnackbar({ severity: "warning", message: error.message })
              );
        }
      });
  };
}

export function newPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/reset-password",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch((error) => {
        // console.log(error);
        {
          error.response
            ? dispatch(
                showSnackbar({
                  severity: "warning",
                  message: error.response.data.message,
                })
              )
            : dispatch(
                showSnackbar({ severity: "warning", message: error.message })
              );
        }
      });
  };
}

export function forgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/forgot-password",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response.data);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch((error) => {
        // console.log(error);
        {
          error.response
            ? dispatch(
                showSnackbar({
                  severity: "warning",
                  message: error.response.data.message,
                })
              )
            : dispatch(
                showSnackbar({ severity: "warning", message: error.message })
              );
        }
      });
  };
}
export function LogOutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
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
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        // console.log(response.data.token);
      })
      .catch(function (error) {
        // console.log(error);
        {
          error.response
            ? dispatch(
                showSnackbar({
                  severity: "warning",
                  message: error.response.data.message,
                })
              )
            : dispatch(
                showSnackbar({ severity: "warning", message: error.message })
              );
        }
      });
  };
}

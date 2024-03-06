import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "phosphor-react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../app/features/authSlice";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
export const RegisterForm = () => {
  // yup is schema validator
  const navigate=  useNavigate();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  });
  const defaultValues = {
    firstName: "John",
    lastName: "Doe",
    email: "demooo@tawk.com",
    password: "demo1234",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const theme = useTheme();
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(registerUser(data));
    reset();
    // navigate("/auth/login");
  };
 

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={1}>
        <Stack direction={"row"} spacing={1} justifyContent={"space-between"}  >
          <Stack direction={"column"}>
            <TextField
              id="outlined-basic"
              {...register("firstName")}
              type="text"
              label="First Name"
              variant="outlined"
              autoComplete="off"
            />
            <p> {errors.firstName?.message} </p>
          </Stack>
          <Stack direction={"column"}>
            <TextField
              id="outlined-basic"
              {...register("lastName")}
              type="text"
              label="Last Name"
              variant="outlined"
              autoComplete="off"
            />
            <p> {errors.lastName?.message} </p>
          </Stack>
        </Stack>
        <TextField
          id="outlined-basic"
          {...register("email")}
          type="text"
          fullWidth
          label="Email"
          variant="outlined"
          autoComplete="off"
        />
        <p> {errors.email?.message} </p>
        <TextField
          id="outlined-basic"
          {...register("password")}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickPassword}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          label="Password"
          variant="outlined"
        />
        <p> {errors.password?.message} </p>
        <LoadingButton
          color="inherit"
          type="submit"
          loading= { isSubmitting }
          fullWidth
        size="large"
        variant="text"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
};

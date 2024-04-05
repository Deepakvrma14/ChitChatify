import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "phosphor-react";
import  {useDispatch} from "react-redux";
import { LogInUser } from "../../app/features/authSlice";
import { LoadingButton } from "@mui/lab";
import { showSnackbar } from "../../app/features/appSlice";

export const LoginForm = () => {
  const dispatch = useDispatch();
  // yup is schema validator
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  });
  const defaultValues = {
    email: "demo@tawk.com",
    password: "demo1234",
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const theme = useTheme();
  
  const onSubmit =async (data) => {
   try {
    dispatch(LogInUser(data));
    console.log(data);
    // dispatch(showSnackbar({severity: "success", message:}))
    reset();
   } catch (error) {
      console.error(error);
      reset();
      setError("After Submit",{
        ...error,
        message:error.message
      })
   }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}  >
      <Stack direction={"column"} spacing={2}>
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
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={ isSubmitting}
        sx={{ backgroundColor: theme.palette.background.paper }}
      > Login </LoadingButton>
       
      </Stack>
    </form>
  );
};

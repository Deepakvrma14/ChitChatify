import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "phosphor-react";

export const LoginForm = () => {
  // yup is schema validator
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={2}>
        <TextField
          id="outlined-basic"
          {...register("email")}
          type="text"
          fullWidth
          label="Email"
          variant="outlined"
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
        <Button
          color="primary"
          type="submit"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};

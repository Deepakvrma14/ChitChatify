import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "phosphor-react";

export const RegisterForm = () => {
  // yup is schema validator
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
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

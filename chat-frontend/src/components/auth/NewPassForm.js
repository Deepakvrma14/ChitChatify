import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { Eye, EyeClosed } from "phosphor-react";

const NewPassForm = () => {
  const schema = yup.object().shape({
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Confirm password must be as same as the above password"
      )
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={2}>
        <TextField
          id="outlined-basic"
          {...register("password")}
          type="text"
          fullWidth
          label="Password"
          variant="outlined"
          autoComplete="off"
        />
        <p> {errors.password?.message} </p>
        <TextField
          id="outlined-basic"
          {...register("confirmPassword")}
          type={showPassword ? "text" : "password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeClosed/> : <Eye/> }
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Confirm Password"
          variant="outlined"
          autoComplete="off"
        />
        <p> {errors.confirmPassword?.message} </p>
        <Button
          color="primary"
          type="submit"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          Reset Password
        </Button>
      </Stack>
    </form>
  );
};

export default NewPassForm;

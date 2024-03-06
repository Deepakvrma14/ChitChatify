import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { Eye, EyeClosed } from "phosphor-react";
import { useDispatch } from "react-redux";
import { newPassword } from "../../app/features/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const NewPassForm = () => {
  const [queryParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup.string().min(6).required(),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Confirm password must be as same as the above password"
      )
      .required(),
  });
  const defaultValues = {
    password: "adsdfasdf",
    passwordConfirm: "adsdfasdf",
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmit = (data) => {
    dispatch(newPassword({...data, resetToken:queryParams.get("token")} ));
    // console.log(data);
    reset();
    navigate("/auth/login");

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
          {...register("passwordConfirm")}
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
        <p> {errors.passwordConfirm?.message} </p>
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

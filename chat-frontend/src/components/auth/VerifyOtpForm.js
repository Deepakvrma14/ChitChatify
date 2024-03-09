// todo create a verify otp frontend, connect it with backend and prtect the backend routes for it

import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField} from "@mui/material";
import {useTheme } from "@mui/material/styles";
const VerifyOtpForm = () => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    otp: yup
      .string()
      .required(6)
      .min(6, "Otp should be of min 6 length")
      .max(6, "Otp must be less than 6 length")
      .matches("/^[0-9]+$/", "OTP must be digit only")
      
  });
  const { register, handleSubmit, formState: {errors, isSubmitting}, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit= (data) =>{
    console.log(data);
    reset();

  }
  const theme = useTheme();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={1}>
        <Stack direction={"row"} spacing={1} justifyContent={"space-between"}  >
          <Stack direction={"column"}>
            <TextField
              id="outlined-basic"
              {...register("otp")}
              type="text"
              label="OTP"
              variant="outlined"
              autoComplete="off"
            />
            <p> {errors.otp?.message} </p>
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

export default VerifyOtpForm;

import React, { useEffect } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../app/features/authSlice';

const ForgotForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    try{
      // console.log(data);
      dispatch(forgotPassword(data));
      reset();
    }catch(error){
      console.log(error);
      setError("afterSubmit", {
       ...error,
       message:error.message, 
      });
      
    }
  };
  const theme = useTheme();
  
  const dispatch = useDispatch();


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
          autoComplete="off"
        />
        <p> {errors.email?.message} </p>
        <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{ backgroundColor: theme.palette.background.paper }}
      > Login </LoadingButton>
      </Stack>
    </form>
  )
}

export default ForgotForm
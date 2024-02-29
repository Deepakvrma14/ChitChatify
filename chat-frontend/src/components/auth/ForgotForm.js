import React from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { Button, Stack } from '@mui/material';

const ForgotForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
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
       <Button
          color="primary"
          type="submit"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          Send Request
        </Button>
      </Stack>
    </form>
  )
}

export default ForgotForm
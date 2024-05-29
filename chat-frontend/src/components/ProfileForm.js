import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useTheme} from "@mui/material/styles";
import { Note, Star } from "phosphor-react";
import { useDispatch } from "react-redux";
import { updateMe } from "../app/features/appSlice";

const ProfileForm = () => {
  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
  });
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
   
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) =>{
    console.log(data);
    try{
      dispatch(updateMe(data));
    }catch(error){
      console.error(error);
    }
  }



  return (
    <Stack 
    sx={{
      width: "99%",

      height: "98vh",
      borderRadius: "20px",
      margin: "2vh",
      padding: "2vh",
      spacing: 1,
    }}
    >
      <form onSubmit={handleSubmit(onSubmit)} >
      <Stack spacing={4} direction={"column"}>
        <TextField 
        fullWidth
        label="First Name"
        {...register("firstName")}
        variant="outlined"

        />
        <TextField
        fullWidth
        label="Last Name"
        {...register("lastName")}
        variant="outlined"
        />

        <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        >
          Save
        </Button>


        
      </Stack>
    </form>
    </Stack>
    
     
      

    
  );
};

export default ProfileForm;

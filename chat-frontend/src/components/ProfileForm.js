import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useTheme} from "@mui/material/styles";
import { Note, Star } from "phosphor-react";

const ProfileForm = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    about: yup.string().required(),
    avatarURL: yup.string().required("Avatar is an required Field").nullable(true),
  });
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
//   for avatar, we can use react Component called Dropzone but it only works client side no way to communicate with servers with it so we'll implement all from scratch
  const values = watch();
//   to memorise a Component, we use a React.memo(component) function in either startt or at exporting default at end 

//   usecallback -> function to be memorised, dependencies of that funtion
  const handleDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    const newFile = Object.assign(file,{
        preview: URL.createObjectURL(file),
    });
    if(file){
        setValue("avatarURL", newFile, {shouldValidate:true});
    }

  }, [setValue]);
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={2}>
      <input type="image" onChange={event => handleDrop(event.target.files)} />
      {values.avatarURL && <img src={values.avatarURL.preview} alt="Avatar" />}

        <TextField
          id="outlined-basic"
          {...register("name")}
          type="text"
          fullWidth
          label="Full Name"
          variant="outlined"
        />
        <p>
            {errors.name?.message}
        </p> 
        
        
        <TextField
          id="outlined-basic"
          {...register("about")}
          type="text"
          fullWidth
          multiline
          rows={5}
          label="About"
          variant="outlined"
        />
        <p>{errors.about?.message}</p>
        <Button fullWidth sx={{backgroundColor:theme.palette.background.paper}} type="submit">Save</Button>
      </Stack>
      
    </form>
    
  );
};

export default ProfileForm;

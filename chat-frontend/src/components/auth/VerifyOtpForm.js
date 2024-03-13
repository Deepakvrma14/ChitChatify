import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Stack} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../app/features/authSlice";

const schema = yup.object().shape({
  code1: yup.string().required().length(1),
  code2: yup.string().required().length(1),
  code3: yup.string().required().length(1),
  code4: yup.string().required().length(1),
  code5: yup.string().required().length(1),
  code6: yup.string().required().length(1),
});

const VerifyOtpForm = ({email}) => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const refs = useRef([]);
  const onSubmit =async (data) => {
    try{

      const otp = Object.values(data).join('');
      
      dispatch(verifyOtp({email, otp}))
    reset()
    }catch(error){
      console.log(error)
    }
  };

  const theme=  useTheme();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"row"} spacing={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Controller
              key={i}
              name={`code${i + 1}`}
              control={control}
              defaultValue=""
              
              render={({ field }) => (
                <TextField
                  {...field}
                  inputProps={{ maxLength: 1 }}
                  error={Boolean(errors[`code${i + 1}`])}

                 
                  inputRef={ref => refs.current[i] = ref}
                  onInput={({ target }) => {
                    
                    if (target.value) {
                      const nextInput = refs.current[i + 1];
                      if (nextInput) {
                        nextInput.focus();
                      }
                    }
                  }}
                  autoFocus={i ===0}
                />
              )}
            />
          ))}
        </Stack>
        <Button type="submit" color="inherit" sx={{bgcolor:theme.palette.background.paper}} >Submit OTP</Button>
        
      </Stack>
    </form>
  );
};

export default VerifyOtpForm;
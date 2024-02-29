import { Box, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { CaretLeft } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import  ForgotForm  from "../../components/auth/ForgotForm";
const ForgotPassword = () => {
  const theme = useTheme();
  return (
    <Box >
      <Stack spacing={2} direction={"column"}>
      {/* typography of titlke  */}
{/* stack with name and create account */}
      <Stack direction={"column"}  >
        <Typography sx={{ mt: 5 }} variant="h4">
          {" "}
          Welcome back to ChitChattify
        </Typography>
        <Stack direction={"row"} sx={{ mt: 1 , mb: 3 }}>
          <Typography variant="body2">Enter your registered email address in the field below. We will send you an OTP (One-Time Password) to reset your password.</Typography>
          
        </Stack>
      </Stack>

      <ForgotForm/>
      
      <Stack alignItems={"flex-start"} sx={{my:2}} >
      <Link to="/auth/login" component={RouterLink} variant="body2" color="inherit" underline="hover" >
          <CaretLeft size={10} /> Return Sign in
          </Link>
      </Stack>
    {/* using react hook forms here for forms  */}
      
      
      
    </Stack>
    </Box>
  );
};

export default ForgotPassword;

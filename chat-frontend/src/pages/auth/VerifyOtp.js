import { Container, Box, Paper, Typography, Divider, Stack } from "@mui/material";
import { SealCheck } from "@phosphor-icons/react";
import VerifyOtpForm from "../../components/auth/VerifyOtpForm"
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const VerifyOtp = () => {
  const theme = useTheme();
  const location = useLocation();
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Stack direction={"column"} alignItems={"center"} spacing={4}>
            <Stack direction={"row"} alignItems={"center"} sx={{ mt: 5 }}>
              <Typography variant="h5">Please Verfiy Email</Typography>
              
            </Stack>
            <Typography variant="body1">
              We have sent a 6-digit OTP to your email ({location.state}). Please enter the OTP below to verify your email address.
            </Typography>
            <Divider />
            {/* Form */}
          <VerifyOtpForm email= {location.state} />
          </Stack>
          
          
       
        {/* below form texts */}
        <Divider />
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            mt: 3,
            alignItems: "center",
            typography: "caption",
          }}
        >
          {"By signing in, I agree to the "}
          <Link underline="always" color={theme.palette.primary.main} >
            Terms of Service
          </Link>
          {"& "}
          <Link underline="always" color={theme.palette.secondary.main}>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default VerifyOtp;
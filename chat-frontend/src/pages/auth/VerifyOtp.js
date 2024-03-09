import { Divider, Stack, Typography} from "@mui/material";
import { SealCheck } from "@phosphor-icons/react";
import VerifyOtpForm from "../../components/auth/VerifyOtpForm"
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
const VerifyOtp = () => {
    const theme = useTheme();
  return (
    <Stack direction={"column"} spacing={2}>
      <Stack direction={"column"} alignItems={"center"} spacing={4}>
        <Stack direction={"row"} alignItems={"center"} sx={{ mt: 5 }}>
          <Typography variant="h2">Verification </Typography>
          <SealCheck size={55} />
        </Stack>
        <Typography>
          Please enter the registered Email and one time password below
        </Typography>
      </Stack>
      {/* Form */}
        <VerifyOtpForm/>
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
            {"by signing in, I agree to "}
            <Link underline="always" color={theme.palette.primary} >
              terms of Service{" "}
            </Link>
            {"& "}
            <Link underline="always" color={theme.palette.secondary}>
              privacy policy{" "}
            </Link>
          </Typography>
    </Stack>
  );
};

export default VerifyOtp;

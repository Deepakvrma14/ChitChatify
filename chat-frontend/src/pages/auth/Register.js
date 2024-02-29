import {
  Box,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import {RegisterForm} from "../../components/auth/RegisterForm";
const Register = () => {
  return (
    <Box>
      <Stack spacing={2} direction={"column"}>
        {/* typography of titlke  */}
        {/* stack with name and create account */}
        <Stack direction={"column"}>
          <Typography sx={{ mt: 5 }} variant="h4">
            {" "}
            Get Started with ChitChattify
          </Typography>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ mt: 1 }}
            alignItems={"center"}
          >
            <Typography variant="body2">Already have an account?</Typography>
            <Link
              to="/auth/login"
              component={RouterLink}
              variant="subtitle"
              fontSize={15}
            >
              Sign In here
            </Link>
          </Stack>
        </Stack>

        {/* login form */}
        <RegisterForm />

        {/* using react hook forms here for forms  */}
        {/* auth social */}
        <div>
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
            <Link underline="always" color="text.primary">
              terms of Service{" "}
            </Link>
            {"& "}
            <Link underline="always" color="text.primary">
              privacy policy{" "}
            </Link>
          </Typography>
        </div>
      </Stack>
    </Box>
  );
};

export default Register;

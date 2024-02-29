import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { TwitterLogo, GoogleLogo, GithubLogo } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import { LoginForm } from "../../components/auth/LoginForm";
const login = () => {
  return (
    <Box>
      <Stack spacing={2} direction={"column"}>
        {/* typography of titlke  */}
        {/* stack with name and create account */}
        <Stack direction={"column"}>
          <Typography sx={{ mt: 5 }} variant="h4">
            {" "}
            Welcome to ChitChattify, Please login{" "}
          </Typography>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ mt: 1 }}
            alignItems={"center"}
          >
            <Typography variant="body2">New user?</Typography>
            <Link to="/auth/register" component={RouterLink} variant="subtitle">
              Create an account here{" "}
            </Link>
          </Stack>
        </Stack>

        {/* login form */}
        <LoginForm />
        <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
          <Link
            to="/auth/reset-password"
            component={RouterLink}
            variant="subtitle"
            underline="always"
          >
            Forgot Password ?
          </Link>
        </Stack>
        {/* using react hook forms here for forms  */}
        {/* auth social */}
        <div>
          <Divider
            sx={{
              my: 2.5,
              typography: "outline",
              color: "text.disabled",
              "&::before, ::after": {
                borderTopStyle: "dashed",
              },
            }}
          >
            or
          </Divider>
        </div>
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton>
            <GoogleLogo />
          </IconButton>
          <IconButton>
            <GithubLogo />
          </IconButton>
          <IconButton>
            <TwitterLogo />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default login;

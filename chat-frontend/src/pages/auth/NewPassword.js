import { Box, Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import NewPassForm from "../../components/auth/NewPassForm";
const NewPassword = () => {
  return (
    <Box>
      <Stack spacing={2} direction={"column"}>
        {/* typography of titlke  */}
        {/* stack with name and create account */}
        <Stack direction={"column"}>
          <Typography sx={{ mt: 5 }} variant="h4">
            {" "}
            Welcome back to ChitChattify
          </Typography>
          <Stack direction={"row"} sx={{ mt: 1, mb: 3 }}>
            <Typography variant="body2">
              Enter your New Password and Confirm Password in the field below.
            </Typography>
          </Stack>
        </Stack>

        <NewPassForm />

        <Stack alignItems={"flex-start"} sx={{ my: 2 }}>
          <Link
            to="/auth/login"
            component={RouterLink}
            variant="body2"
            color="inherit"
            underline="hover"
          >
            <CaretLeft size={10} />
            Remember old password? Sign in here
          </Link>
        </Stack>
        {/* using react hook forms here for forms  */}
      </Stack>
    </Box>
  );
};

export default NewPassword;

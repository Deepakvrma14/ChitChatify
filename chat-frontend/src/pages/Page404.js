import { Error } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Repeat } from "phosphor-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{
        height: "100vh",
        textAlign: "center",
        p: 1,
        width: "100%",
      }}
    >
      <Error color={theme.palette.background.paper} style={{ fontSize: 100 }} />
      <Typography variant="h3">
        Oops! We got into some errors.
      </Typography>
      <Typography variant="subtitle1">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Repeat />}
        onClick={() => navigate("/app")}
      >
        Go to Home Page
      </Button>
    </Stack>
  );
};

export default Page404;
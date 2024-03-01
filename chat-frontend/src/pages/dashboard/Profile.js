import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { CaretLeft, CaretRight, Star } from "phosphor-react";
import ProfileForm from "../../components/ProfileForm";
const Profile = () => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} width={"100%"} sx={{ backgroundColor: "#fff" }}>
      {/* box having the profile settings */}
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.default,
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
          border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
          borderRadius: 0,
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          p={3}
          height={"100vh"}
          justifyContent={"space-between"}
        >
          {/* Header */}
          <Stack >
          <Stack
            direction={"row"}
            alignContent={"flex-start"}
            alignItems={"center"}
            spacing={3}
            p={1}
            // justifyContent={"space-around"}
          >
            <IconButton  >
              <CaretLeft />
            </IconButton>
            <Typography variant="h5" letterSpacing={1}>
              Profile
            </Typography>
            
          </Stack>
          {/* upload img part */}

          {/* form having name and about */}
            <ProfileForm/>
          </Stack>

          <Typography variant="subtitle2">
            <Star /> This name would be visible to all of your contacts
          </Typography>
        </Stack>
      </Box>
      {/* Box having the other half of the screen */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
          border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
          borderRadius: 0,
        }}
      ></Box>
    </Stack>
  );
};

export default Profile;

import { Box, IconButton, Typography, Stack } from "@mui/material";
import { CaretLeft, UserCircle } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import ProfileForm from "../../components/ProfileForm";
import { CarProfile } from "@phosphor-icons/react";

const Profile = () => {
  const theme = useTheme();

  return (
    <Stack
      spacing={2}
      direction={"column"}
      sx={{
        position: "relative",
        width: 315,
        height: "98vh",
        borderRadius: "20px",
        margin: "1vh",
        spacing: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: "20px",
          border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
          padding: "1vh",
          height: 70,
          marginBottom: "1vh",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f6f6f6"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={2}
          p={1}
        >
          <Typography variant="h5" letterSpacing={1}>
            Update Profile
          </Typography>
          <div
              style={{
                borderRadius: "50%",
                background: theme.palette.background.logo,
                display: "inline-flex",
              }}
            >
          <IconButton>
            <UserCircle size={22} color={theme.palette.primary.contrastText} />
          </IconButton>
          </div>
        </Stack>
      </Box>

      <Box
        sx={{
          borderRadius: "20px",
          border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
          padding: "1vh",
          flexGrow: 1,
          overflowX: "hidden",
          scrollbarColor: theme.palette.primary.dark,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f6f6f6"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            flexGrow: 1,
            height: "100%",
            overflowX: "hidden",
            scrollbarColor: theme.palette.primary.dark,
          }}
          spacing={2}
        >
          <ProfileForm />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Profile;

import {
  VideoCamera,
  Phone,
  MagnifyingGlass,
  CaretDown,
} from "@phosphor-icons/react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { StyledBadge } from "../customMui/StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../app/features/appSlice";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    // <Box p={2} >
      <Stack
      p={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={3}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              onClick={() => dispatch(toggleSidebar())}
              alt={faker.name.fullName()}
              src={faker.image.avatar()}
            />
          </StyledBadge>
          <Stack spacing={0.2} direction={"column"}>
            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems={"center"} justifyContent={"center"} spacing={3}>
          <IconButton
            sx={{
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : "fff",
            }}
          >
            <VideoCamera size={24} weight="fill" />
          </IconButton>
          <IconButton
            sx={{
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : "fff",
            }}
          >
            <Phone size={24} weight="fill" />
          </IconButton>
          <IconButton
            sx={{
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : "fff",
            }}
          >
            <MagnifyingGlass size={24} />
          </IconButton>
          <Divider orientation={"vertical"} flexItem />
          <IconButton
            sx={{
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : "fff",
            }}
          >
            <CaretDown size={24} />
          </IconButton>
        </Stack>
      </Stack>
    // </Box>
  );
};

export default Header;

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
import { useDispatch, useSelector } from 'react-redux';
import {toggleSidebar} from '../../app/features/appSlice'

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  return (
    <Box
      p={2}
      sx={{
        height: 100,
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.default,
        boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
    
            <Avatar onClick={() => dispatch(toggleSidebar())} alt={faker.name.fullName()} src={faker.image.avatar()} />
          </StyledBadge>
          <Stack spacing={0.2} direction={"column"}>
            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={3}>
          <IconButton
            sx={{
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : theme.palette.text.primary,
            }}
          >
            <VideoCamera size={24} />
          </IconButton>
          <IconButton
            sx={{
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : theme.palette.text.primary,
            }}
          >
            <Phone size={24} />
          </IconButton>
          <IconButton
            sx={{
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : theme.palette.text.primary,
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
                  : theme.palette.text.primary,
            }}
          >
            <CaretDown size={24} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;

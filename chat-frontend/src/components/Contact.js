import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  ArrowArcLeft,
  ArrowRight,
  CaretCircleRight,
  CaretRight,
  Divide,
  Phone,
  Star,
  VideoCamera,
  X,
} from "phosphor-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../app/features/appSlice";
import { faker } from "@faker-js/faker";
export const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: 320, height: "100%" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            height: 100,
            backgroundColor:
              theme.palette.mode === "light" ? "#f1f1f1" : "#2a303c",
          }}
        >
          <Stack
            direction="row"
            sx={{ height: "100%", p: 2 }}
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => dispatch(toggleSidebar())}>
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.firstName}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={700}>
                {" "}
                {faker.name.fullName()}{" "}
              </Typography>
              <Typography variant="article" fontWeight={500}>
                {faker.phone.number()}{" "}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            spacing={2}
            sx={{ display: "flex" }}
            alignItems="center"
            justifyContent="space-evenly"
          >
            {/* horizontal one */}
            <Stack
              direction={"column"}
              sx={{ display: "flex" }}
              alignItems="center"
              justifyContent="center"
              p={0.5}
              spacing={1}
            >
              {/* 2 verticl for video and audio  */}
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video</Typography>
            </Stack>
            <Stack
              direction={"column"}
              sx={{ display: "flex" }}
              alignItems="center"
              justifyContent="center"
              p={0.5}
              spacing={1}
            >
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Audio</Typography>
            </Stack>
          </Stack>

          {/* header end */}
          <Divider />
          <Stack direction="column" spacing={1} justifyContent="space-evenly">
            <Typography variant="article" fontWeight={400}>
              About
            </Typography>
            <Typography variant="body2">{faker.lorem.sentence()}</Typography>
          </Stack>

          <Divider />
          {/* about end */}

          <Stack direction={"column"}>
            <Stack
              direction={"row"}
              sx={{ display: "flex" }}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography> Media, Links and Docs</Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Button endIcon={<CaretRight />}  color="inherit">
                  {faker.random.numeric()}
                </Button>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={2}
            >
              {[1, 2, 3].map((el) => (
                <Box>
                  <img
                    src={faker.image.cats()}
                    alt={faker.name.suffix()}
                    height="100%"
                    width="100%"
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
          {/* media and images end  */}
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            
          >
            <Button startIcon={<Star />} color="inherit" justifyContent={"space-between"}  >
              <Typography>Starred Messages</Typography>
              
            </Button>
          </Stack>
          <Divider/>
          {/* Starred msgsed end */}
        </Stack>
      </Stack>
    </Box>
  );
};

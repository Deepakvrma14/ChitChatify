import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import AntSwitch from "./customMui/AntSwitch";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import { useDispatch } from "react-redux";
import { toggleSidebar, updateSidebarType } from "../app/features/appSlice";
import { faker } from "@faker-js/faker";
import { Media } from "./Media";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Block = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Block Contact?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};
const Delete = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete Contact?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [opneBlock, setOpenBlock] = useState(false);
  const [opneDelete, setOpenDelete] = useState(false);
  const handleClose = () => {
    if (setOpenBlock(false));
    if (setOpenDelete(false));
  };
  return (
    <Box sx={{ width: 320, height: "100vh", overflowY: "auto" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            height: 100,
            backgroundColor: theme.palette.background.back,
          }}
        >
          <Stack
            direction="row"
            sx={{ height: "100%", p: 2 }}
            alignItems="center"
            justifyContent="around"
            spacing={3}
          >
            <IconButton onClick={() => dispatch(toggleSidebar())}>
              <X />
            </IconButton>
            <Typography variant="subtitle2">Contact Info</Typography>
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
              <IconButton
                sx={{
                  color: theme.palette.mode === "light" ? "#000" : "fff",
                }}
              >
                <VideoCamera weight="fill" />
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
              <IconButton
                sx={{
                  color: theme.palette.mode === "light" ? "#000" : "fff",
                }}
              >
                <Phone weight="fill" />
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
                <Button
                  endIcon={<CaretRight />}
                  color="inherit"
                  onClick={() => dispatch(updateSidebarType({ type: "MEDIA" }))}
                >
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
                <Box key={el}>
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
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Star />
              <Typography variant="subtitle">Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => dispatch(updateSidebarType({ type: "STARRED" }))}
            >
              <CaretRight size={25} />
            </IconButton>
          </Stack>

          {/* Starred msgsed end */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Bell />
              <Typography variant="subtitle">Mute Notifications</Typography>
            </Stack>
            <IconButton>
              <AntSwitch />
            </IconButton>
          </Stack>
          <Divider />
          {/* mute end */}
          <Typography> 1 Group in common</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar src={faker.image.business()} height={64} width={64} />
            <Stack direction={"column"} spacing={0.5}>
              <Typography variant="article">{faker.company.name()}</Typography>
              <Typography variant="subtitle">
                {" "}
                {faker.lorem.words()}{" "}
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          {/* groups end */}
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Button
              fullWidth
              onClick={() => setOpenBlock(true)}
              variant="outlined"
              color="inherit"
              startIcon={<Prohibit />}
            >
              Block
            </Button>
            <Button
              fullWidth
              onClick={() => setOpenDelete(true)}
              variant="outlined"
              startIcon={<Trash />}
              color="inherit"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {opneBlock && <Block open={opneBlock} handleClose={handleClose} />}
      {opneDelete && <Delete open={opneDelete} handleClose={handleClose} />}
    </Box>
  );
};

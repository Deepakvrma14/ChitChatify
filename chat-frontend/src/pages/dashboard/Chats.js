import {
  Box,
  IconButton,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import {
  CircleDashed,
  MagnifyingGlass,
  ArchiveBox,
  Users,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import ChatElement from "./ChatElement";
import { ChatList } from "../../data";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./custom/CustomMaterialUI";
import { useState } from "react";
import Friends from "../../components/main/Friends";

const Chats = () => {
  const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () =>{
        setOpenDialog(true);
    }

    const handleCloseDialog= () =>{
        setOpenDialog(false);
    }
  return (
    <>
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
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5" letterSpacing={1}>
            ChitChatify
          </Typography>
          <Stack direction={"row"} alignItems={"center"}spacing={1}>
            <IconButton onClick={handleOpenDialog} >
            <Users size={30} />
            </IconButton>
            <IconButton>
              <CircleDashed size={30} />
            </IconButton>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color={theme.palette.primary.main} size={22} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>
          <Divider />
        </Stack>
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
          <Stack spacing={2.4}>
            <Typography
              variant="subtitle"
              sx={{
                color:
                  theme.palette.mode === "light"
                    ? "#000"
                    : theme.palette.text.primary,
              }}
            >
              Pinned
            </Typography>
            {ChatList.filter((el) => el.pinned).map((el) => {
              return <ChatElement {...el} key={el.id} />;
            })}
          </Stack>
          <Stack spacing={2.4} marginTop={2}>
            <Typography
              variant="subtitle"
              sx={{
                color:
                  theme.palette.mode === "light"
                    ? "#000"
                    : theme.palette.text.primary,
              }}
            >
              All Chats
            </Typography>
            {ChatList.filter((el) => !el.pinned).map((el) => {
              return <ChatElement {...el} key={el.id} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </Box>
    {openDialog && <Friends open={open} handleClose={handleCloseDialog} />}
    </>
  );
};

export default Chats;

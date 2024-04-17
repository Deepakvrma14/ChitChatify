import {
  Box,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import {
  PaperPlaneTilt,
  Link,
  Smiley,
  Image,
  Sticker,
  Camera,
  File,
  User,
} from "@phosphor-icons/react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));

const ChatInput = ({ setOpenPicker }) => {
  const [openActions, setOpenActions] = useState(false);
  const theme = useTheme();
  const Actions = [
    {
      color: theme.palette.primary.main,
      icon: <Image color= {theme.palette.primary.contrastText} size={24} />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: theme.palette.primary.main,
      icon: <Sticker color= {theme.palette.primary.contrastText} size={24} />,
      y: 172,
      title: "Stickers",
    },
    {
      color: theme.palette.primary.main,
      icon: <Camera color= {theme.palette.primary.contrastText} size={24} />,
      y: 242,
      title: "Image",
    },
    {
      color: theme.palette.primary.main,
      icon: <File color= {theme.palette.primary.contrastText} size={24} />,
      y: 312,
      title: "Document",
    },
    {
      color: theme.palette.primary.main,
      icon: <User color= {theme.palette.primary.contrastText} size={24} />,
      y: 382,
      title: "Contact",
    },
  ];
  return (
    <StyledInput
      fullWidth
      
      placeholder="Write a message..."
      variant="standard"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Actions.map((el) => (
                <Tooltip placement="right" key={el.title} title={el.title}>
                  <Fab
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment position="start" >
              <IconButton onClick={() => setOpenActions(!openActions)}>
                <Link size={24} />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),

        endAdornment: (
          <InputAdornment position="start" >
            <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
              <Smiley size={24} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);

  return (
      
      <Stack direction={"row"} alignItems={"center"} spacing={3} p={1} >
        {/* Chat Input */}
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              zIndex: 10,
              position: "fixed",
              bottom: 81,
              right: 100,
              display: openPicker ? "inline" : "none",
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={console.log}
            />
          </Box>
          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>
        <IconButton
        
          sx={{
            borderRadius: "10px",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          <PaperPlaneTilt size={24} />
        </IconButton>
      </Stack>
  );
};

export default Footer;

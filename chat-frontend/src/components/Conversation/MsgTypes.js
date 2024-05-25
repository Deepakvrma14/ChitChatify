import React from "react";
import {
  Stack,
  Typography,
  Divider,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Image, DownloadSimple, DotsThreeVertical } from "phosphor-react";
import { Message_options } from "../../data";

import Embed from "react-embed";

const DocMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.text.msg
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems={"center"}
            direction={"row"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">abstract.png</Typography>
            <IconButton>
              <DownloadSimple size={24} />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={
              el.incoming
                ? theme.palette.text
                : theme.palette.primary.contrastText
            }
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const LinkMsg = ({ el }) => {
  const theme = useTheme();

  // Extract the URL from el.message
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlMatch = el.message.match(urlRegex);
  const url = urlMatch ? urlMatch[0] : "";

  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.text.msg
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Embed url={url} />
          <Typography
            variant="body2"
            color={
              el.incoming
                ? theme.palette.text
                : theme.palette.primary.contrastText
            }
          >
            
            <div dangerouslySetInnerHTML={{ __html: el.message }}></div>
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const ReplyMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.text.msg
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction={"column"}
            spacing={3}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={
              el.incoming
                ? theme.palette.text
                : theme.palette.primary.contrastText
            }
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const MediaMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.text.msg
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: 10 }}
          />
        </Stack>
        <Typography
          variant="body2"
          color={
            el.incoming
              ? theme.palette.text
              : theme.palette.primary.contrastText
          }
        >
          {el.message}
        </Typography>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const TextMsg = ({ el }) => {
  const theme = useTheme();
  
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.text.msg
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={
            el.incoming
              ? theme.palette.text
              : theme.palette.primary.contrastText
          }
        >
          
          {el.message}
        </Typography>
      </Box>
      {/* Menu Options */}
      <MessageOptions />
    </Stack>
  );
};

const TimeLine = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <DotsThreeVertical
        size={32}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem key={el.title}>
              <Stack
                onClick={(event) => {
                  event.stopPropagation();
                  handleClose();
                }}
              >
                {el.title}
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };

import { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Box,
  Stack,
  IconButton,
  Divider,
  Avatar,
  Switch,
  Menu,
  MenuItem,
} from "@mui/material";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { faker } from "@faker-js/faker";
import { useTheme, styled } from "@mui/material/styles";
import useSettings from "../../hooks/useSettings";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../app/features/authSlice";
import {
  Gear,
  GitlabLogoSimple,
  Moon,
  PawPrint,
  Sparkle,
  Sun,
  Users,
} from "phosphor-react";
import Friends from "../../components/main/Friends";

const SideBar = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setSelected(1);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const { onToggleMode, themeMode } = useSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  return (
    <>
      <Box
        padding={2}
        overflow="hidden"
        sx={{
          backgroundColor:  theme.palette.mode === "light"
          ? "#010019"
          : theme.palette.background.paper,
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          height: "98h",
          width: "60vh",
          borderRadius: "20px",
          position: "relative",
          margin: "1vh",
        }}
      >
        <Stack
          direction={"column"}
          sx={{ width: "100%", height: "100%" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={3}
        >
          <Box
            sx={{
              height: 64,
              width: 64,
              borderRadius: 8.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PawPrint color={theme.palette.background.logo}  size={40} weight="fill" />

            {/* <img
              src={appimages.images.logo}
              height="100%"
              width="100%"
              alt="chat app logo"
            /> */}
          </Box>

          <Stack alignItems={"center"} spacing={4}>
            <Stack
              spacing={3}
              sx={{ width: "max-content" }}
              direction="column"
              alignItems="center"
            >
              {Nav_Buttons.map((el) => (
                <Box key={el.index} p={1}>
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                      if (el.index === 1) {
                        handleOpenDialog();
                      }
                    }}
                    sx={{
                      width: "max-content",
                      color: el.index === selected ? theme.palette.background.logo : themeMode === "light" ? "#fff" : theme.palette.text.primary,
                    }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ))}

              <Divider flexItem />
              {selected === 3 ? (
                <Box p={1}>
                  <IconButton
                    sx={{
                      width: "max-content",
                      color: theme.palette.background.logo,
                    }}
                  >
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <Box p={1}>
                  <IconButton
                    onClick={() => {
                      setSelected(3);
                    }}
                    sx={{
                      width: "max-content",
                      color: themeMode === "light" ? "#fff" : theme.palette.text.primary,
                    }}
                  >
                    <Gear />
                  </IconButton>
                </Box>
              )}
            </Stack>
          </Stack>
          <Stack spacing={4}>
            {/* <AntSwitch
            defaultChecked
            onChange={() => {
              onToggleMode();
            }}
          /> */}
            {themeMode === "light" ? (
              <IconButton
                onClick={onToggleMode}
                sx={{
                  color: "#ff4a09",
                }}
              >
                <Moon weight="fill" />
              </IconButton>
            ) : (
              <IconButton
                onClick={onToggleMode}
                sx={{
                  color: theme.palette.background.logo,
                }}
              >
                <Sun weight="fill" />
              </IconButton>
            )}

            <Avatar
              id="demo-positioned-button"
              src={faker.image.avatar()}
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            {/*  click functionality */}

            <Menu
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              MenuListProps={{
                "aria-labelledby": "demo-button",
              }}
            >
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((el, idx) => (
                  <MenuItem key={el.title}>
                    <Stack
                      sx={{ width: 100 }}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (idx === 2) {
                          dispatch(LogOutUser());
                        }
                        handleClose();
                      }}
                    >
                      <span>
                        {el.icon} {el.title}
                      </span>
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default SideBar;

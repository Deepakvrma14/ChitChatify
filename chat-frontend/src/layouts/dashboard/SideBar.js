import { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Stack, IconButton, Divider, Avatar, Switch, Menu, MenuItem } from "@mui/material";
import appimages from "../../assets/Images/AppImages";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { faker } from "@faker-js/faker";
import { useTheme, styled } from "@mui/material/styles";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/customMui/AntSwitch";
import { MdBlurOn } from "react-icons/md";


const SideBar = () => {
  const theme = useTheme();

  const [selected, setSelected] = useState(0);

  const { onToggleMode } = useSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  return (
    <Box
      padding={2}
      overflow="hidden"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        height: "100vh",
        width: "100vh",
      }}
    >
      <Stack
        direction={"column"}
        sx={{ width: "100%", height: "100%" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              
              height: 64,
              width: 64,
              borderRadius: 8.5,
              display: 'flex',
              justifyContent:'center',
              alignItems:'center',
            }}
          >
            <MdBlurOn size={50} />
            {/* <img
              src={appimages.images.logo}
              height="100%"
              width="100%"
              alt="chat app logo"
            /> */}
          </Box>
          <Stack
            spacing={3}
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  key={el.index}
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    key={el.index}
                    sx={{
                      width: "max-content",
                      color: "#fff",
                    }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(el.index);
                  }}
                  key={el.index}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              )
            )}
            <Divider flexItem />
            {selected === 3 ? (
              <Box
                p={1}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  sx={{
                    width: "max-content",
                    color: "#fff",
                  }}
                >
                  <SettingsOutlinedIcon />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  setSelected(3);
                }}
                sx={{
                  width: "max-content",
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
              >
                <SettingsOutlinedIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch
            defaultChecked
            onChange={() => {
              onToggleMode();
            }}
          />

          <Avatar id="demo-positioned-button" src={faker.image.avatar()}
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
              "aria-labelledby":"demo-button",
            }}
            
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el) => (
                <MenuItem onClick={handleClick} key={el.title} >
                  <Stack sx={{width:100}} direction="row" alignItems="center" justifyContent="space-between">
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
  );
};

export default SideBar;

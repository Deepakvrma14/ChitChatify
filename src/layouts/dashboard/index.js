import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Divider, IconButton, Stack } from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Logo from '../../assets/Images/logo.ico'
import {Nav_Buttons} from '../../data/index'
import { Gear } from "phosphor-react";
const DashboardLayout = () => {
  const theme = useTheme();
  console.log(theme);

  return (
    <>
      <Box p={2} sx={{backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", height:"100vh", width:100}} >
        <Stack direction="column" alignItems="center" sx={{width:"100%"}} spacing={3} >
        <Box sx={{backgroundColor:theme.palette.primary.main, height:64, width:64, borderRadius:2.5}}>
          <img src={Logo} alt="chat-app-logo"/>
        </Box>

        <Stack spacing={3} sx={{width:"max-content"}} direction="column" alignItems="center" >
        {Nav_Buttons.map((icn) => <IconButton key={icn.index}>
            {icn.icon}
          </IconButton>
        )}
        <Divider/>
        <IconButton>
          <Gear/>
        </IconButton>
        </Stack>
        
        </Stack>
      </Box>

      <Outlet />
    </>
  );
};

export default DashboardLayout;

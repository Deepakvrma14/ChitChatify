import React from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import SideBar from "./SideBar";
import MobileScreenComponent from './MobileScreenComponent.js'; 

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.authState);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />
  }

  if (isSmallScreen || isMediumScreen) {
    return <MobileScreenComponent />; 
  }

  return (
    <Stack direction={"row"} overflow={"hidden"}>
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
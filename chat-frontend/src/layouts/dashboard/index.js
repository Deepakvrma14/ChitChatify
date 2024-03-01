import React from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const DashboardLayout = () => {
  const isAuthenticated = true;
  if(!isAuthenticated){
    return <Navigate to="/auth/login"/>
  }
  return (   
    <Stack direction={"row"}>    
      <SideBar />
      <Outlet />
    </Stack>   
  );
  
};

export default DashboardLayout;

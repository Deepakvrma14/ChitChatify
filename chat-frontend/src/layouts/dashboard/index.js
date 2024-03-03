import React from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import {  useSelector } from 'react-redux';
import SideBar from "./SideBar";

const DashboardLayout = () => {

  const {isLoggedIn} = useSelector((state)=> state.authState);

  if(!isLoggedIn){
    return <Navigate to="/auth/login"/>
  }
  return (   
    <Stack direction={"row"} overflow={"hidden"}  >    
      <SideBar />
      <Outlet />
    </Stack>   
  );
  
};

export default DashboardLayout;

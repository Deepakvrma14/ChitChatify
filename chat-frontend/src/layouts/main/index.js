import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import icon from '../../assets/Images/icon.png';
import {  useSelector } from 'react-redux';
const MainLayout = () => {
  
  const {isLoggedIn} = useSelector((state)=> state.authState);
  if(isLoggedIn){
    return <Navigate to="/app"/>
  }
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm"  >
        <Stack spacing={5} >
<Stack sx={{width:"100%" }} direction={"column"} alignItems={"center"}  >
  <img src= {icon} height={100} width={130} />
</Stack>
        </Stack>
        {/* <div>Main Layout</div> */}

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;

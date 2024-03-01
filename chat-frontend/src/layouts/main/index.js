import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import icon from '../../assets/Images/icon.png';

const MainLayout = () => {
  const isAuthenticated = true;
  if(isAuthenticated){
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

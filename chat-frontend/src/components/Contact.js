import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { X } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../app/features/appSlice';
import { faker } from '@faker-js/faker';
export const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box sx={{width:320, height:"100%"}} >
      <Stack sx={{height:"100%"}} >
        <Box sx={{
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          width:"100%",
          height:100,
          backgroundColor:theme.palette.mode === 'light' ? '#f1f1f1' : '#2a303c'
        }} >
          <Stack direction="row" sx={{height:"100%",p:2 }} alignItems="center" justifyContent="space-between" spacing={3} >
            <Typography variant='subtitle2' >
              Contact Info
            </Typography>
            <IconButton onClick={()=> dispatch(toggleSidebar())} >
              <X/>
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack sx={{height:"100%" , position:"relative" , flexGrow:1, overflowY:"scroll"}} p={3} spacing={3} >
          <Stack alignItems={"center"} direction={"row"} spacing={2} >
            <Avatar src={faker.image.avatar()} alt={faker.name.firstName} sx={{height:64, width:64}} />

            
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
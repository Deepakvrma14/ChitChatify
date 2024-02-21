import { Box, Stack, IconButton, TextField, InputAdornment, Fab, Tooltip } from "@mui/material";
import { useTheme, styled } from '@mui/material/styles';
import { PaperPlaneTilt, Link, Smiley, Image, Sticker, Camera, File, User } from "@phosphor-icons/react";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import {useState} from 'react';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: "12px !important",
      paddingBottom: "12px !important",
    },
  }));

  const Actions = [
    {
      color: "#4da5fe",
      icon: <Image size={24} />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: "#1b8cfe",
      icon: <Sticker size={24} />,
      y: 172,
      title: "Stickers",
    },
    {
      color: "#0172e4",
      icon: <Camera size={24} />,
      y: 242,
      title: "Image",
    },
    {
      color: "#0159b2",
      icon: <File size={24} />,
      y: 312,
      title: "Document",
    },
    {
      color: "#013f7f",
      icon: <User size={24} />,
      y: 382,
      title: "Contact",
    },
  ];


const ChatInput = ({setOpenPicker}) => {

    const [openActions, setOpenActions] = useState(false);

    return (
        <StyledInput 
            fullWidth                    
            placeholder="Write a message..."
            variant="filled" 
            InputProps={{
                    disableUnderline: true,
                    startAdornment:  (
                        <Stack sx={{width: "max-content"}} >
                            <Stack 
                                sx={{
                                    position: "relative", 
                                    display: openActions ? "inline-block" : "none"
                                }}
                            >
                                {Actions.map((el) => (
                                    <Tooltip placement="right" title={el.title}>
                                        <Fab 
                                            sx={{
                                                position: "absolute", 
                                                top: -el.y, 
                                                backgroundColor: el.color
                                            }}
                                        >
                                            {el.icon}
                                        </Fab>
                                    </Tooltip>
                                ))} 
                            </Stack>
                                <InputAdornment>
                                    <IconButton
                                        onClick={() => setOpenActions(!openActions)}
                                    >
                                        <Link size={24} />                                    
                                    </IconButton>
                                </InputAdornment>
                        </Stack>  
                    ), 
                                     
                        endAdornment: (
                            <InputAdornment>
                                <IconButton 
                                    onClick={() => setOpenPicker((prev) => !prev)}
                                >
                                <Smiley size={24} 
                                />    
                                </IconButton>
                        </InputAdornment>
                    ),
                           
                }}
           />
    );
};
   
const Footer = () => {
    
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);

  return (
    <Box
            p={3}            
            sx={{
                height: 100,
                width: "100%",
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Stack
                direction={"row"}
                alignItems={"center"}                
                spacing={3}               
            >   
                {/* Chat Input */}
                <Stack
                    sx={{
                        width: "100%"
                    }}
                >
                    <Box
                        sx={{
                            zIndex: 10,
                            position: "fixed",
                            bottom: 81, 
                            right: 100, 
                            display: openPicker ?  "inline" : "none"                          
                        }}
                    >
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log}/>
                    </Box>                    
                    <ChatInput setOpenPicker={setOpenPicker} />
                </Stack>
                 <IconButton               
                    sx={{
                        borderRadius: "5px",
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff"
                    }}                   
                 >
                    <PaperPlaneTilt size={24} />
                 </IconButton>
            </Stack>
        </Box>      
  )
}

export default Footer;
import { useState } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Stack, IconButton, Divider, Avatar, Switch } from "@mui/material";
import appimages from "../../assets/Images/AppImages";
import { Nav_Buttons } from "../../data";
import { faker } from "@faker-js/faker";
import { useTheme, styled } from "@mui/material/styles";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/customMui/AntSwitch";

const SideBar = () => {

    const theme = useTheme();

    const [selected, setSelected] = useState(0);  

    const {onToggleMode} = useSettings();

  return (
    <Box
        padding={2}
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
            height: "100vh",
            width: 100,
          }}
        >
            <Stack 
              direction={"column"}
              sx={{width: "100%", height: "100%"}} 
              justifyContent={"space-between"}
              alignItems={"center"} 
              spacing={3} 
            >
              <Stack alignItems={"center"} spacing={4}>
                <Box sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: 64,
                  width: 64,
                  borderRadius: 1.5,
                }}>
                    <img src={appimages.images.logo} alt="chat app logo" />  
                </Box> 
                <Stack 
                  spacing={3} 
                  sx={{width: "max-content"}} 
                  direction="column" 
                  alignItems="center">
                  {Nav_Buttons.map((el) => (  
                    el.index === selected ?
                    <Box
                    key={el.index}
                      p={1}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5
                      }}
                    >
                      <IconButton key={el.index}
                        sx={{
                          width: "max-content",
                          color: "#fff"
                        }}
                      >
                        {el.icon}
                      </IconButton> 
                    </Box>          
                    : <IconButton 
                        onClick={() => {
                          setSelected(el.index)
                        }}
                        key={el.index}
                        sx={{
                          width: "max-content",
                          color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                      >
                        {el.icon}
                      </IconButton>               
                  ))}
                  <Divider flexItem />   
                  { selected === 3 ? 
                    <Box
                      p={1}
                      sx={{                     
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5
                      }}
                    >
                      <IconButton
                        sx={{
                          width: "max-content",
                          color: "#fff"
                        }}
                      >
                        <SettingsOutlinedIcon />
                      </IconButton>  
                  </Box>
                  :
                    <IconButton                  
                      onClick={() => {
                        setSelected(3);
                      }}  
                      sx={{
                        width: "max-content",
                        color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                      }}                  
                    >
                      <SettingsOutlinedIcon />
                    </IconButton> 
                  }                           
                </Stack> 
              </Stack>  
              <Stack spacing={4}>
                <AntSwitch 
                  defaultChecked 
                  onChange={() => {
                    onToggleMode();
                  }}
                />
                <Avatar src={faker.image.avatar()}    />   
              </Stack>                   
            </Stack>       
        </Box>   
  )
}

export default SideBar;
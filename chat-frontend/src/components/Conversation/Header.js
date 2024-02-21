import { VideoCamera, Phone, MagnifyingGlass, CaretDown} from "@phosphor-icons/react";
import { Box, Stack, Badge, Avatar, Typography, IconButton, Divider} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { faker } from "@faker-js/faker";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const Header = () => {

    const theme = useTheme();

  return (
    <Box
            p={2}
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
                justifyContent={"space-between"} 
                sx={{
                    width: "100%",
                    height: "100%"
                }}    
            >
                <Stack 
                    direction={"row"}
                    alignItems={"center"}
                    spacing={3}
                >
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
                    </StyledBadge>
                        <Stack
                            spacing={0.2}
                            direction={"column"}
                        >
                            <Typography variant='subtitle2'>
                                {faker.name.fullName()}
                            </Typography>
                            <Typography variant='caption'>
                            Online
                            </Typography>    
                    </Stack>           
                </Stack>
                <Stack 
                    direction="row"
                    alignItems={"center"}
                    spacing={3}                    
                >
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <VideoCamera size={24} />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <Phone size={24} />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <MagnifyingGlass size={24} />
                    </IconButton>
                     <Divider 
                        orientation={"vertical"}
                        flexItem
                    />
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <CaretDown size={24} />
                    </IconButton> 
                </Stack>
            </Stack>
        </Box>
  )
}

export default Header;
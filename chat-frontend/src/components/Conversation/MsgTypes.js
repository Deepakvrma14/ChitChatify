import React from 'react';
import { Stack, Typography, Divider, Box, Link, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Image, DownloadSimple, DotsThreeVertical } from 'phosphor-react';
import { Message_options } from '../../data';


const DocMsg = ({el}) => {

    const theme = useTheme();

    return (
        <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
            <Box 
                p={1.5} 
                sx={{ 
                    backgroundColor: el.incoming 
                        ? theme.palette.background.default 
                        : theme.palette.primary.main,
                        borderRadius: 1.5,
                        width: "max-content",
                    }}
                >
                    <Stack spacing={2}>
                        <Stack 
                            p={2}
                            spacing={3}
                            alignItems={"center"}
                            direction={"row"}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 1
                            }}
                        >
                            <Image size={48} />
                            <Typography variant="caption">
                                abstract.png
                            </Typography>
                            <IconButton>
                                <DownloadSimple size={24} />
                            </IconButton>
                        </Stack>   
                        <Typography 
                            variant='body2'
                            color={el.incoming ? theme.palette.text : "#fff"}
                        >
                            {el.message}
                        </Typography>
                    </Stack>                
            </Box>
        </Stack>
    )
}


const LinkMsg = ({el}) => {

    const theme = useTheme();

    return (
        <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
            <Box 
                p={1.5} 
                sx={{ 
                    backgroundColor: el.incoming 
                        ? theme.palette.background.default 
                        : theme.palette.primary.main,
                        borderRadius: 1.5,
                        width: "max-content",
                    }}
                >
                    <Stack spacing={2}>
                        <Stack 
                            p={2} 
                            spacing={3} 
                            alignItems={"center"}
                            direction={"column"}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: 1
                                }}
                        >
                            <img src={el.preview} alt={el.message} style={{ maxHeight: 210, borderRadius: 10}}/>

                        </Stack>
                        <Stack spacing={2}>
                            <Typography variant='subtitle2'>Creating Chat App</Typography>
                            <Typography 
                                variant='subtitle2' 
                                component={Link}
                                sx={{
                                    color: theme.palette.primary.main,
                                    '&:hover' : {
                                        cursor: "pointer"
                                    }
                                }}     
                                to="https://www.youtube.com"                                
                            >   
                                www.youtube.com                  
                            </Typography>
                        </Stack>
                        <Typography 
                            variant='body2'
                            color={el.incoming ? theme.palette.text : "#fff"}
                        >
                            {el.message}
                        </Typography>
                    </Stack>
            </Box>
        </Stack>
    )
}


const ReplyMsg = ({el}) => {

    const theme = useTheme();

    return (
        <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
            <Box 
                p={1.5} 
                sx={{ 
                    backgroundColor: el.incoming 
                        ? theme.palette.background.default 
                        : theme.palette.primary.main,
                        borderRadius: 1.5,
                        width: "max-content",
                    }}>  
                    <Stack spacing={2}>
                        <Stack 
                            p={2} 
                            direction={'column'} 
                            spacing={3} 
                            alignItems={"center"}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: 1
                                }}                       
                        >
                            <Typography variant='body2' color={theme.palette.text}>
                                {el.message}
                            </Typography>

                        </Stack>
                        <Typography variant='body2' color={el.incoming ? theme.palette.text : "#fff"}>
                            {el.reply}
                        </Typography>
                    </Stack>       
            </Box>
        </Stack>  
    )
}

const MediaMsg = ({el}) => {
    const theme = useTheme();

    return (
        <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
            <Box 
                p={1.5} 
                sx={{ 
                    backgroundColor: el.incoming 
                        ? theme.palette.background.default 
                        : theme.palette.primary.main,
                        borderRadius: 1.5,
                        width: "max-content",
                    }}>
                        <Stack
                            spacing={1}
                        >
                            <img src={el.img} alt={el.message} style={{ maxHeight: 210, borderRadius: 10}} />
                        </Stack>  
                        <Typography variant='body2' color={el.incoming ? theme.palette.text : "#fff"}>
                            {el.message}
                        </Typography>                      
            </Box>
        </Stack>    
    )
}


const TextMsg = ({el}) => {

    const theme = useTheme();

    return (
        <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
            <Box 
                p={1.5} 
                sx={{ 
                    backgroundColor: el.incoming 
                        ? theme.palette.background.default 
                        : theme.palette.primary.main,
                        borderRadius: 1.5,
                        width: "max-content",
                    }}>
                        <Typography variant='body2' color={el.incoming ? theme.palette.text : "#fff"}>
                            {el.message}
                        </Typography>
            </Box>
           {/* Menu Options */}
           <MessageOptions />
        </Stack>    
    )
}

const TimeLine = ({el}) => {

    const theme = useTheme();

  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Divider width="46%" />
            <Typography variant="caption" sx={{color: theme.palette.text}}>
                {el.text}
            </Typography>
        <Divider width="46%" />
    </Stack>
  )
}

const MessageOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
            <DotsThreeVertical size={32} 
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}           
            />
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((el) => (
                        <MenuItem onClick={handleClick}>{el.title}</MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
         
    )
}

export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg};
import { Box, Stack } from '@mui/material';
import { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes';
import { Chat_History } from '../../data';

const Message = () => {
  return (
    <Box
        p={3}        
    >
        <Stack spacing={3}>
            {Chat_History.map((el) => {
                switch (el.type) {
                    case "divider" :
                        return <TimeLine el={el} key={el.type}/>
                                            
                    case "msg":
                        switch (el.subtype) {
                            case "img":
                                // Img msg
                                return <MediaMsg el={el}/>                               
                            case "doc":
                                // Doc msg
                                return <DocMsg el={el} />
                            case "link":
                                // Link msg
                                return <LinkMsg el={el} />
                            case "reply":
                                // Reply msg
                                return <ReplyMsg el={el} />

                            default: 
                                // Text Msg
                                return <TextMsg el={el} />                                   
                        }   
                   
                    default: 
                       break;                              
                }
            })}
        </Stack>
    </Box>
  )
}

export default Message;
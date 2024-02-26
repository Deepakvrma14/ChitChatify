import { Box, Stack } from '@mui/material';
import { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes';
import { Chat_History } from '../../data';

const Message = () => {
  return (
    <Box
        p={3}        
    >
        <Stack spacing={3}>
            {Chat_History.map((el, index) => {
                switch (el.type) {
                    case "divider" :
                        return <TimeLine el={el} key={el.type}/>
                                            
                        case "msg":
                            switch (el.subtype) {
                              case "img":
                                return <MediaMsg el={el} key={index} />;
                              case "doc":
                                return <DocMsg el={el} key={index} />;
                              case "link":
                                return <LinkMsg el={el} key={index} />;
                              case "reply":
                                return <ReplyMsg el={el} key={index} />;
                              default:
                                return <TextMsg el={el} key={index} />;
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
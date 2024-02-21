import { Box, Stack} from "@mui/material";
import Header from '../Conversation/Header';
import Message from '../Conversation/Message';
import Footer from '../Conversation/Footer';

const Conversation = () => {    

  return (
    <Stack
        direction="column"
        height={"100%"}
        maxHeight={"100vh"}
        width={"auto"}
    >
        {/* Chat Header */}
        <Header />

        {/* Msg */}
        <Box
            width={"100%"}
            sx={{
                flexGrow: 1,
                height: "100%", 
                overflowY: "scroll"                                         
            }}
        >
            <Message />

        </Box>
        
        {/* Chat Footer */}
        <Footer />
    </Stack>
  )
}

export default Conversation;
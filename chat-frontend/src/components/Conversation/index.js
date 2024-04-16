import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../Conversation/Header";
import Message from "../Conversation/Message";
import Footer from "../Conversation/Footer";

const Conversation = () => {
  const theme = useTheme();
  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{
        position: "relative",
        
        height: "98vh",
        borderRadius: "20px",
        margin: "1vh",
        spacing: 1,
      }}
      
    >
      {/* Chat Header */}
      <Box
      
        sx={{
          borderRadius: "20px",
          border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
          padding: "1vh",
          marginBottom: "1vh",
          height: 70,
          width: "100%",
          backgroundColor:
          theme.palette.mode === "light"
          ? "#f6f6f6"
          : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Header />
      </Box>

      {/* Msg */}
      <Box
        sx={{
          borderRadius: "20px",
          border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
          padding: "1vh",
          flexGrow: 1,
          backgroundColor: theme.palette.mode === "light"
          ? "#f6f6f6"
          : theme.palette.background.paper,
          overflowX: "hidden",
          scrollbarColor: theme.palette.primary.dark,
        }}
      >
        <Message />
      </Box>

      {/* Chat Footer */}
      <Box
      p={1}
        sx={{
          borderRadius: "20px",
          border: `1px solid ${theme.palette.mode === "light" ? "#d0d0d0" : "#2a303c"}`,
          padding: "1vh",
          backgroundColor:theme.palette.mode === "light"
          ? "#f6f6f6"
          : theme.palette.background.paper,
          marginBottom: "1vh",
        }}
      >
        <Footer />
      </Box>
    </Stack>
  );
};

export default Conversation;

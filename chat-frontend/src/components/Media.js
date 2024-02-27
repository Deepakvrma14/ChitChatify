import { Box, IconButton, Typography } from "@mui/material";
import {useTheme} from "@mui/material/styles";
import { Stack, X } from "phosphor-react";
import { useDispatch } from "react-redux"
import { toggleSidebar } from "../app/features/appSlice";

export const Media = () =>{
    const dispatch = useDispatch();
    const theme  = useTheme();
    return(
      <Box sx={{ width: 320, height: "100vh", overflowY: "auto" }}>
        

        
      </Box>
    );
}
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
            <Stack sx={{ height: "100%" }}>
                <Box
                sx={{
                    boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
                    width: "100%",
                    height: 100,
                    backgroundColor:
                    theme.palette.mode === "light" ? "#f1f1f1" : "#2a303c",
                }}
                >
                <Stack
                    direction="row"
                    sx={{ height: "100%", p: 2 }}
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={3}
                >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => dispatch(toggleSidebar())}>
              <X />
            </IconButton>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        ></Stack>
        </Stack>
        </Box>
        
    );
}
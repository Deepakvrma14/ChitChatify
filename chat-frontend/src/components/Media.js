import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { updateSidebarType } from "../app/features/appSlice";
import { CaretLeft } from "phosphor-react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { FileDoc, FileImage, Link } from "phosphor-react";
import { useState } from "react";

export const Media = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
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
            justifyContent="around"
            spacing={3}
          >
            <IconButton
              onClick={() => dispatch(updateSidebarType({ type: "CONTACT" }))}
            >
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Media </Typography>
          </Stack>
        </Box>
        {/* header end */}
        {/* body start */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab icon={<FileImage size={28} />} />
            <Tab icon={<Link size={28} />} />
            <Tab icon={<FileDoc size={28} />} />
          </Tabs>

          {(() => {
            switch (value) {
              case 0:
                break;
              case 1:
                break;
              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

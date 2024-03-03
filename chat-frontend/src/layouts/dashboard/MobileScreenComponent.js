import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const MobileScreenComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: theme.spacing(2),
        textAlign: 'center',
      }}
    >
      <PhoneAndroidIcon style={{ fontSize: 100, color: theme.palette.primary.main }} />
      <Typography variant="h4" gutterBottom>
        Mobile/tablet View Not Supported
      </Typography>
      <Typography variant="body1">
        Please continue on a larger screen or desktop. We currently do not support mobile devices.
      </Typography>
    </Box>
  );
};

export default MobileScreenComponent;
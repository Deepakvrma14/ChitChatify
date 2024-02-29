import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

export const LoginForm =() => {
  return (
   
      <Box
   
    
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
    <Stack direction={"column"} spacing={2}  >
     <TextField id="outlined-basic" fullWidth label="Outlined" variant="outlined" />
      <TextField id="outlined-basic" fullWidth label="Outlined" variant="outlined" />
     </Stack>
    </Box>
  
  );
}
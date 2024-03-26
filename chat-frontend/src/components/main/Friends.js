import { Dialog, Stack, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'

const Friends = ({open, handleClose}) => {
    const [value, setValue] = useState(0);
    const handleChange= (event, newValue)=>{
        setValue(newValue)
    }
  return (
    <Dialog fullWidth open={open} keepMounted maxWidth="xs" onClose={handleClose} >
       <Stack p={2} width={"100%"} >
       <Tabs centered onChange={handleChange} value={value} >
            
            <Tab label ="Explore"/>
            <Tab label ="Friends"/>
            <Tab label ="Requests"/>
    
    
            </Tabs>
       </Stack>
    </Dialog>
  )
}

export default Friends
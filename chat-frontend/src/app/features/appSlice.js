import {createSlice} from '@reduxjs/toolkit';

const defaultState= {
    sidebar: {
        open:false,
        type: 'CONTACT'
    },
};
const appSlice = createSlice({
    
    name: 'app' ,
    initialState:defaultState,
    reducers:{
        // toggle Sidebar
        toggleSidebar(state){
            
            state.sidebar.open = !state.sidebar.open ;

        },
        updateSidebarType(state, action){
            state.sidebar.type = action.payload.type;

        },
    },
});


export const { toggleSidebar, updateSidebarType } = appSlice.actions;
export default appSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';


export const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT"
      }
    };


const appSlice = createSlice({
    
    name: 'app' ,
    initialState,
    reducers:{
        // toggle Sidebar
        toggleSidebar(state, action){
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action){
            state.sidebar.type = action.payload.type;

        },
    },
});

export function ToggleSidebar() {
    return appSlice.actions.toggleSidebar();
}

export function UpdateSidebarType(type) {
    return appSlice.actions.updateSidebarType({ type });
}

export const { toggleSidebar, updateSidebarType } = appSlice.actions;
export default appSlice.reducer;
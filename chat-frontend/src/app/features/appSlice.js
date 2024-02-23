import {createSlice} from '@reduxjs/toolkit';

import { dispatch } from '../store';

const initialState = {
    sidebar: {
        open:false,
        type:"CONTACT" // can also be SHARED, STARRED

    }
}

const slice = createSlice({
    name:'app',
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
export const { toggleSidebar, updateSidebarType } = slice.actions;
export default slice.reducer;
export function ToggleSidebar() {
    return slice.actions.toggleSidebar();
}

export function UpdateSidebarType(type) {
    return slice.actions.updateSidebarType({ type });
}
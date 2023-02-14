import { createSlice } from "@reduxjs/toolkit";


const menuSlice =  createSlice({
    name:'menu',
    initialState:{
        menuActive:false,
    },
    reducers:{
        showMenu:(state) => {state.menuActive = true},
        hideMenu:(state) => {state.menuActive = false}
    } 
})

export const useMenuActive = (state) => state.menu.menuActive
export const {showMenu , hideMenu} = menuSlice.actions
export default menuSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = true

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarState: (state) => {
        return state = !state
    },
  },
  
})

export const sidebarReducer =  sidebarSlice.reducer
export const {setSidebarState} = sidebarSlice.actions

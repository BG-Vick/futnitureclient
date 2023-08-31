import { ICart } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// SLICE - a collection of Redux reducer logic and actions for a single feature in your app
const initialState: ICart[] = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: typeof initialState, action: PayloadAction<ICart>) => {
      console.log(action)
      action.payload.count = 1
      state.push(action.payload)
    },
    removeItem: (
      state: typeof initialState,
      action: PayloadAction<{ id: number }>
    ) => {
      return state.filter((p) => p.id !== action.payload.id)
    },
    countIncrement: (state: typeof initialState, action: PayloadAction<{ id: number }>) => {
      state.map((p) => {
        if(p.id === action.payload.id){
          p.count++
        }
      })
    },
    countDecrement: (state: typeof initialState, action: PayloadAction<{ id: number }>) => {
      state.map((p) => {
        if(p.id === action.payload.id){
          p.count--
        }
      })
    },
  },
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions

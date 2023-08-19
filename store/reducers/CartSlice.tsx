import { IProduct } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IProduct[] = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: typeof initialState, action: PayloadAction<IProduct>) => {
        state.push(action.payload)
    },
    removeItem: (state: typeof initialState, action: PayloadAction<{id: number}>) => {
        return state.filter((p) => p.id !== action.payload.id)
    }
  },
  
})

export const cartReducer =  cartSlice.reducer
export const cartActions = cartSlice.actions

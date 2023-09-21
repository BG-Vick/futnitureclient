import { ICart } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ICart[] = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: typeof initialState, action: PayloadAction<ICart>) => {
      action.payload.count = 1
      state.push(action.payload)
    },
    removeItem: (
      state: typeof initialState,
      action: PayloadAction<{ id: number }>
    ) => {
      return state.filter(({ id }) => id !== action.payload.id)
    },
    countIncrement: (
      state: typeof initialState,
      action: PayloadAction<{ id: number }>
    ) => {
      state.map((p) => {
        if (p.id === action.payload.id) {
          p.count++
        }
      })
    },
    countDecrement: (
      state: typeof initialState,
      action: PayloadAction<{ id: number }>
    ) => {
      state.map((p) => {
        if (p.id === action.payload.id) {
          p.count--
        }
      })
    },
    clearCard: () => {
      return initialState
    },
  },
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions

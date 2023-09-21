import { IProduct } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: IProduct[] = []

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductState: (
      state: typeof initialState,
      action: PayloadAction<IProduct[]>
    ) => {
      return (state = action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      console.log('HYDRATION')
      return (state = action.payload.product)
    })
  },
})

export const productReducer = productSlice.reducer
export const { setProductState } = productSlice.actions

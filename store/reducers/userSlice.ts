import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IUser } from '@/models/models'

const initialState: IUser = {
  id: null,
  email: '',
  role: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      return (state = action.payload)
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        id: action.payload.user.id,
        email: action.payload.user.email,
        role: action.payload.user.role,
      }
    })
  },
})

export const { setUserState } = userSlice.actions

export const userReducer = userSlice.reducer

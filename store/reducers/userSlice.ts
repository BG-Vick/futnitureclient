import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IUser } from '@/models/models'
// Type for our state


// Initial state
const initialState: IUser = {
  id: null,
  email: '',
  role: ''
}

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      return state = action.payload
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    })
  }, 
})

export const { setUserState } = userSlice.actions


export default userSlice.reducer

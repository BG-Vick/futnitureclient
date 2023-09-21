import { cartReducer } from './reducers/cartSlice'
import { createWrapper } from 'next-redux-wrapper'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { Action } from 'redux'
import { userReducer } from './reducers/userSlice'
import { sidebarReducer } from './reducers/sidebarSlice'
import { productReducer } from './reducers/productSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      sidebar: sidebarReducer,
      product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(),
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const store = makeStore()
export const wrapper = createWrapper<AppStore>(makeStore)

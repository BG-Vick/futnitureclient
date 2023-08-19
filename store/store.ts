import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productApi } from "@/services/PostService";
import { cartReducer, cartActions } from "./reducers/CartSlice";
import { deviceApi } from "@/services/DevicesService";



export const store = configureStore({
        reducer: {
            [productApi.reducerPath] : productApi.reducer, 
            [deviceApi.reducerPath] : deviceApi.reducer,
            cart: cartReducer
        },
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(productApi.middleware, deviceApi.middleware)
    })

 
export type TypeRootState = ReturnType<typeof store.getState>


import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import Authslice from "../createSlice/Authslice";
import Cartslice from '../createSlice/Cartslice';
import Shiping_address_slice from "../createSlice/Shiping_address_slice";
import Addressslice from "../createSlice/Addressslice";
import Searchslice from "../createSlice/Searchslice";
import { api } from "../createSlice/Apislice";
import Profileslice from "../createSlice/Profileslice";
export const store = configureStore({
    reducer: {
        auth: Authslice,
        cart: Cartslice,
        address: Addressslice,
        shipping: Shiping_address_slice,
        search: Searchslice,
        profile:Profileslice,
        [api.reducerPath]: api.reducer
    },
     // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
setupListeners(store.dispatch)
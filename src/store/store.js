import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../createSlice/Authslice";
import Cartslice from '../createSlice/Cartslice';
import Shiping_address_slice from "../createSlice/Shiping_address_slice";
import Addressslice from "../createSlice/Addressslice";
import Searchslice from "../createSlice/Searchslice";
export const store = configureStore({
    reducer: {
        auth: Authslice,
        cart: Cartslice,
        address: Addressslice,
        shipping: Shiping_address_slice,
        search: Searchslice

    }
})
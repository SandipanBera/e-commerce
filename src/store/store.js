import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../createSlice/Authslice";
import Cartslice from '../createSlice/Cartslice';
import Cart_item_slice from "../createSlice/Cart_item_slice";
export const store = configureStore({
    reducer: {
        auth: Authslice,
        cart: Cartslice,
        items:Cart_item_slice
    }
})
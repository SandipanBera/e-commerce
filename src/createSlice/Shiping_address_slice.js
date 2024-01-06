import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: null
}
export const Shippingslice = createSlice({
    name: "shipping",
    initialState,
    reducers: {
        addShipingAddress: (state, action) => {
            state.data = action.payload;
        },
        removeShipingAddress: (state) => {
            state.data = null;
        },


    }
})
// Action creators are generated for each case reducer function
export const { addShipingAddress, removeShipingAddress } = Shippingslice.actions
export default Shippingslice.reducer;

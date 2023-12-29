import { createSlice } from "@reduxjs/toolkit";
let initialState = {  
    data: null,
    itemCount:0,
}
;
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addInCart: (state,action) => {
     if (action.payload.data) {
       state.data = action.payload.data
          }
          if (action.payload.itemCount) {
            state.itemCount=action.payload.itemCount
          }
    },
    removeCart: (state, action) => {
      state.data.items = state.data.items.filter(item => item.product._id !== action.payload.id)
      state.data.cartTotal=state.data.cartTotal-action.payload.price
      state.itemCount = state.itemCount - 1;
    },
    clearCart: (state) => {
      state.data=null
      state.itemCount = 0;
    },
  },
});
// Action creators are generated for each case reducer function
export const { addInCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

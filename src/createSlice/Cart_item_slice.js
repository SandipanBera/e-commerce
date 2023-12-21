import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items:[]
}
export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let flag=true
          state.items.map(item=>item._id===action.payload._id?flag=false:null)
            //_id,name,image,quantity,price(actualPrice-discount),actualPrice is in payload
            if (flag) {
                state.items.push(action.payload)
            } else {
                state.items.quantity=state.items.quantity+1
            }
            // flag=true
        },
        decreaseItem: (state,action) => {
            state.items.map(item=>item._id===action.payload?item.quantity=item.quantity-1:null)
        },
        removeItem: (state, action) => { 
            state.items.filter(item=>item._id!=action.payload)
        },
        removeAllItem: (state) => {
            state.items.length=0
        }
    }
})
// Action creators are generated for each case reducer function
export const { addItem,decreaseItem ,removeItem, removeAllItem } = itemsSlice.actions;
export default itemsSlice.reducer;
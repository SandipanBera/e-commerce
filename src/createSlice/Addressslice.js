import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addressData: null,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses(state, action) {
      state.addressData=action.payload
     },
    setNewAddress: (state, action) => {
      state.addressData.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      state.addressData.addresses= state.addressData.addresses.map((address) => {
        if (address._id === action.payload.id) {
        return  address = action.payload.data;
        } else {
          return address;
        }
      });
    },
    deleteAddress: (state, action) => {
      state.addressData.addresses = state.addressData.addresses.filter(
        (address) => address._id !== action.payload
      );
    },
  },
});
export const {setAddresses, setNewAddress, updateAddress, deleteAddress } =
  addressSlice.actions;
export default addressSlice.reducer;

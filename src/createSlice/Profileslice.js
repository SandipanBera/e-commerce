import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
};
export const userData = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.data = action.payload;
    },
    deleteUserProfile: (state) => {
      state.data = null;
    },
  },
});
export const { setUserProfile, deleteUserProfile } = userData.actions;
export default userData.reducer;

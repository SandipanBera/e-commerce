import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: null,
    status: false
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData
            state.status = true;    
        },
        logout: (state) => {
            state.status = false;
            state.userData=null
        }
    }
})
// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;
export default authSlice.reducer
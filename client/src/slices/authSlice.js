import { createSlice } from '@reduxjs/toolkit';

// Checks the local storage to see if userInfo is stored there. If so, then initialState is set to it. Otherwise, it is set to null
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

// Creates the slice for authentication.
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearCredentials: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },

    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
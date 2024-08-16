import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    currentUser: null,
    users: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.users.push({
                ...action.payload,
                registrationDate: new Date().toISOString().split('T')[0],
            });
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
        },
    },
});

export const { registerUser, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, configureStore } from "@reduxjs/toolkit";

// Creating the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: "", isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    }
});

// Exporting the actions from the auth slice
export const authActions = authSlice.actions;

// Configuring the Redux store
export const store = configureStore({
    reducer: authSlice.reducer
});
import { createSlice,configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        email: "",
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        clearStore: (state) => {
            state.username = "";
            state.email = "";
        },
    }
});

export const {
    setUsername,
    setEmail,
    clearStore,
} = userSlice.actions;

export const store = configureStore({
    reducer: userSlice.reducer,
});
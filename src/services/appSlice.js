import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    username: "",
    email: "",
    photo: "",
    projects: []
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setID: (state, action) => {
            state.id = action.payload;
        },
        setUserName: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhoto: (state, action) => {
            state.photo = action.payload;
        },
        addProjects: (state, action) => {
            const projectExists = state.projects.some(project => project.id === action.payload.id);

            if (!projectExists) {
                state.projects.push(action.payload);
            }
        },
        clearStore: (state) => {
            state.id = "";
            state.username = "";
            state.email = "";
            state.photo = "";
            state.projects = [];
        },
    }
});

export const {
    setID,
    setUserName,
    setEmail,
    setPhoto,
    addProjects,
    clearStore
} = appSlice.actions;

export const store = configureStore({
    reducer: appSlice.reducer,
});


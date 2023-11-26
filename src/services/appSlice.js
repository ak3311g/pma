import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    email: "",
    photo: "",
    projects: []
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
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
        }
    }
});

export const {
    setUserName,
    setEmail,
    setPhoto,
    addProjects
} = appSlice.actions;

export const store = configureStore({
    reducer: appSlice.reducer,
});


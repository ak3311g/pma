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
        addProjects: (state, action) => {
            const projectExists = state.projects.some(project => project.id === action.payload.id);

            if (!projectExists) {
                state.projects.push(action.payload);
            }
        },
        deleteProject: (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);

            if (index >= 0) {
                state.projects.splice(index, 1);
            }
        },
        clearStore: (state) => {
            state.projects = [];
        },
    }
});

export const {
    addProjects,
    clearStore
} = appSlice.actions;

export const store = configureStore({
    reducer: appSlice.reducer,
});
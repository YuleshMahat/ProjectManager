// src/store/slices/projectsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Single Project (matches your Mongoose model)
export interface Project {
  _id: string;
  userId: string;
  name: string;
  image: string;
  skills: string[];
  github: string;
  live: string;
  description?: string;
  featured?: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Projects State
interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Set all projects (from API)
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Add single project (after create)
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload); // newest first
    },

    // Update existing project
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },

    // Delete project
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p._id !== action.payload);
    },

    // Reorder projects (drag & drop)
    reorderProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Reset everything
    clearProjects: (state) => {
      state.projects = [];
      state.error = null;
      state.loading = false;
    },
  },
});

// Export actions
export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects,
  setLoading,
  setError,
  clearProjects,
} = projectsSlice.actions;

// Export reducer
export default projectsSlice.reducer;

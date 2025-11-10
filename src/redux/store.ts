import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/auth/authSlice";
import projectReducer from "@/features/projects/projectsSlice";
import personalInfoReducer from "@/features/personalInfo/personalInfoSlice";

const store = configureStore({
  reducer: {
    userStore: userReducer,
    projectStore: projectReducer,
    personalInfoStore: personalInfoReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

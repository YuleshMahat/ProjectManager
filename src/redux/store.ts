import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/auth/authSlice";
import projectReducer from "@/features/projects/projectsSlice";

const store = configureStore({
  reducer: { userStore: userReducer, projectStore: projectReducer },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

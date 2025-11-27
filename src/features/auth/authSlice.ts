// features/auth/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      // Clear everything
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.clear();
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;

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
}

const initialState: UserState = {
  user: null,
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
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

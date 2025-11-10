// features/personalInfo/personalInfoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfoState {
  name: string;
  email: string;
  title: string;
  github: string;
  linkedin: string;
}

const initialState: PersonalInfoState = {
  name: "John Doe",
  email: "john@example.com",
  title: "Senior Full-Stack Engineer",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
};

export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInfoState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    // auth, attendance, payroll, etc.
    auth: authReducer,
  },
});
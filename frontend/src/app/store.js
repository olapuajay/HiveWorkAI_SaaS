import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import attendanceReducer from "../features/attendance/attendanceSlice";
import leaveReducer from "../features/leave/leaveSlice";

export const store = configureStore({
  reducer: {
    // auth, attendance, payroll, etc.
    auth: authReducer,
    attendance: attendanceReducer,
    leave: leaveReducer,
  },
});
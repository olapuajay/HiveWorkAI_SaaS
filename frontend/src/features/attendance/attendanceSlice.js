import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  clockInApi,
  clockOutApi,
  getMyAttendanceApi,
  getCompanyAttendanceApi,
} from "../../api/attendance.api";

export const clockIn = createAsyncThunk(
  "attendance/clockIn",
  async () => {
    const res = await clockInApi();
    return res.data.attendance;
  }
);

export const clockOut = createAsyncThunk(
  "attendance/clockOut",
  async () => {
    const res = await clockOutApi();
    return res.data.attendance;
  }
);

export const fetchMyAttendance = createAsyncThunk(
  "attendance/fetchMy",
  async () => {
    const res = await getMyAttendanceApi();
    return res.data.records;
  }
);

export const fetchCompanyAttendance = createAsyncThunk(
  "attendance/fetchCompany",
  async () => {
    const res = await getCompanyAttendanceApi();
    return res.data.records;
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    records: [],
    today: null,
    loading: false,
  },
  reducers: {
    socketClockIn: (state, action) => {
      state.records.unshift({
        employee: { _id: action.payload.employeeId, name: action.payload.name },
        status: "PRESENT",
        date: new Date().toISOString(),
      });
    },
    socketClockOut: (state, action) => {
      const record = state.records.find(
        (r) => r.employee._id === action.payload.employeeId
      );
      if (record) {
        record.totalHours = action.payload.hours;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAttendance.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompanyAttendance.fulfilled, (state, action) => {
        state.records = action.payload;
      });
  },
});

export const { socketClockIn, socketClockOut } = attendanceSlice.actions;
export default attendanceSlice.reducer;

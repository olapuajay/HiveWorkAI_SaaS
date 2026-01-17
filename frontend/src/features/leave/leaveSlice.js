import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyLeaveApi,
  getMyLeavesApi,
  getCompanyLeavesApi,
  reviewLeaveApi
} from "../../api/leave.api";

export const applyLeave = createAsyncThunk(
  "leave/apply",
  async (data) => {
    const res = await applyLeaveApi(data);
    return res.data.leave;
  }
);

export const fetchMyLeaves = createAsyncThunk(
  "leave/fetchMy",
  async () => {
    const res = await getMyLeavesApi();
    return res.data.leaves;
  }
);

export const fetchCompanyLeaves = createAsyncThunk(
  "leave/fetchCompany",
  async () => {
    const res = await getCompanyLeavesApi();
    return res.data.leaves;
  }
);

export const reviewLeave = createAsyncThunk(
  "leave/review",
  async ({ id, status }) => {
    const res = await reviewLeaveApi(id, { status });
    return res.data.leave;
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    records: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLeaves.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(fetchCompanyLeaves.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.records.unshift(action.payload);
      })
      .addCase(reviewLeave.fulfilled, (state, action) => {
        const idx = state.records.findIndex(
          (l) => l._id === action.payload._id
        );
        if(idx !== -1) state.records[idx] = action.payload;
      });
  },
});

export default leaveSlice.reducer;
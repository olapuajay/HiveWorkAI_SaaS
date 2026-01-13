import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth.api";
import { connectSocket, disconnectSocket } from "../../app/socket";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    const res = await loginUser(credentials);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    token: null,
    error: null,
    loading: false,
  },
  reducer: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      localStorage.clear();
      disconnectSocket();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user, role, tenant } = action.payload;
        state.loading = false;
        state.token = token;
        state.user = user;
        state.role = role;

        localStorage.setItem("token", token);
        localStorage.setItem("tenant", tenant);

        connectSocket(token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
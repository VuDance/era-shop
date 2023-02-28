import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      loading: false,
      error: false,
      message: "",
    },
    register: {
      loading: false,
      error: false,
      succsess: false,
      message: "",
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.loading = true;
    },
    loginSuccess: (state, action) => {
      state.login.loading = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      state.login.message = "";
    },
    loginFailed: (state, action) => {
      state.login.loading = false;
      state.login.error = true;
      state.login.message = action.payload;
    },
    registerStart: (state) => {
      state.register.loading = true;
    },
    registerSuccess: (state, action) => {
      state.register.loading = false;
      state.login.currentUser = action.payload;
      state.register.error = false;
      state.register.message = "";
    },
    registerFailed: (state, action) => {
      state.register.loading = false;
      state.register.error = true;
      state.register.message = action.payload;
    },
    logout: (state) => {
      state.login.currentUser = null;
    },
  },
});

export const {
  logout,
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
} = authSlice.actions;
export default authSlice.reducer;

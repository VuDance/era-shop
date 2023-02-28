import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "order",
  initialState: {
    notication: [],
  },
  reducers: {
    loadNoti: (state, action) => {
      state.notication = action.payload;
    },
    addNoti: (state, action) => {
      state.notication = [...state.notication, action.payload];
    },
    emtyNoti: (state) => {
      state.notication = [];
    },
  },
});

export const { loadNoti, addNoti, emtyNoti } = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    uniqueId: "",
    address: "",
  },
  reducers: {
    loadAddress: (state, action) => {
      state.address = action.payload;
    },
    removeAddress: (state) => {
      state.address = "";
    },
    addUniqueId: (state, action) => {
      state.uniqueId = action.payload;
    },
  },
});

export const { loadAddress, removeAddress, addUniqueId } = addressSlice.actions;
export default addressSlice.reducer;

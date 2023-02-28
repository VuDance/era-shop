import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    uniqueId: "",
    address: "",
    userId: "",
    payment: "",
    totalPrice: 0,
  },
  reducers: {
    addOrder: (state, action) => {
      state.address = action.payload.address;
      state.uniqueId = action.payload.uniqueId;
      state.payment = action.payload.payment;
      state.totalPrice = action.payload.totalPrice;
      state.userId = action.payload.userId;
    },
    removeOrder: (state) => {
      state.uniqueId = "";
      state.address = "";
      state.userId = "";
      state.payment = "";
      state.totalPrice = 0;
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;

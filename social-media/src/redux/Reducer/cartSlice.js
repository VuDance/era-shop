import { createSlice } from "@reduxjs/toolkit";

const cartSlide = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    loadData: (state, action) => {
      state.products = action.payload;
    },
    addBelong: (state, action) => {
      state.products.forEach(
        (item, i, self) => (self[i].belong = action.payload)
      );
    },
    removeItem: (state, action) => {
      const newCart = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.products = [...newCart];
    },
    removeCart: (state) => {
      state.products = [];
    },
    increaseQty: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.products[index].qty++;
    },
    decreaseQty: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.products[index].qty--;
    },
  },
});

export const {
  loadData,
  increaseQty,
  decreaseQty,
  removeItem,
  addBelong,
  removeCart,
} = cartSlide.actions;
export default cartSlide.reducer;

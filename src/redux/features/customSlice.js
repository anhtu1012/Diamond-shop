// src/redux/features/customSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const customSlice = createSlice({
  name: "custom",
  initialState: {
    product: null,
    diamond: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    removeProduct: (state) => {
      state.product = null;
    },
    setDiamond: (state, action) => {
      state.diamond = action.payload;
    },
    removeDiamond: (state) => {
      state.diamond = null;
    },
  },
});

export const { setProduct, removeProduct, setDiamond, removeDiamond } =
  customSlice.actions;

// Selector
export const selectProduct = (state) => state.custom.product;
export const selectDiamond = (state) => state.custom.diamond;

export default customSlice.reducer;

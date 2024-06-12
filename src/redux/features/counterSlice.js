import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    product: null,
    diamond: null,
  },
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload;
    },
    logout: (state) => {
      state.user = null;
      state.product = null;
      state.diamond = null;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
    setDiamond: (state, action) => {
      state.diamond = action.payload;
    },
    clearDiamond: (state) => {
      state.diamond = null;
    },
  },
});

export const {
  login,
  logout,
  setProduct,
  clearProduct,
  setDiamond,
  clearDiamond,
} = counterSlice.actions;
export const selectUser = (store) => store.user.user;
export const selectProduct = (store) => store.user.product;
export const selectDiamond = (store) => store.user.diamond;
export default counterSlice.reducer;

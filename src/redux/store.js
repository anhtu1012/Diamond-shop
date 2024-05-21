import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./account/UserSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;

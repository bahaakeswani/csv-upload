import { configureStore } from "@reduxjs/toolkit";
import loginStateSlice from "./isLoggedIn";

export default configureStore({
  reducer: {
    loginState: loginStateSlice,
  },
});

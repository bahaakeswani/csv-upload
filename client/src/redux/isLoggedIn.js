import { createSlice } from "@reduxjs/toolkit";

export const loginStateSlice = createSlice({
  name: "loginState",
  initialState: {
    value: false,
  },
  reducers: {
    isLogged: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { isLogged } = loginStateSlice.actions;

export default loginStateSlice.reducer;

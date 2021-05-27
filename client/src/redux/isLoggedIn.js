import { createSlice } from "@reduxjs/toolkit";

export const loginStateSlice = createSlice({
  name: "loginState",
  initialState: {
    value: false,
  },
  reducers: {
    status: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { status } = loginStateSlice.actions;

export default loginStateSlice.reducer;

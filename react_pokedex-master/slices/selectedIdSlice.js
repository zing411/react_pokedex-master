import { createSlice } from "@reduxjs/toolkit";

export const selectedIdSlice = createSlice({
  name: "selectedId",
  initialState: 1,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    assign: (state, action) => {
      return action.payload;
    },
  },
});

export const { increment, decrement, assign } = selectedIdSlice.actions;

export default selectedIdSlice.reducer;

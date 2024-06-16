import { createSlice } from "@reduxjs/toolkit";
import { resetState } from "../Reset/reset-actions";

// Slice
const filterSlice = createSlice({
  name: "filter",
  initialState: "all",
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => {
      return "all";
    });
  },
});

// Actions
export const { setFilter } = filterSlice.actions;

// Reducer
export const filterReducer = filterSlice.reducer;

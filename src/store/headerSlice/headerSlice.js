import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    selected: "home",
    moviesColors: {
      naruto: "orange",
      onepiece: "blue",
    },
  },
  reducers: {
    selectTab: (state, action) => {
      state.selected = action.payload;
    },
  },
});
export const { selectTab } = headerSlice.actions;

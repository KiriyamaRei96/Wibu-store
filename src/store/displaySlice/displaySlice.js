import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
  name: "display info",
  initialState: {
    movieLogos: [],
    hotTypes: [],
  },
  reducers: {
    setMovie: (state, action) => {
      let outPut = {};
      action.payload.forEach((movie) => {
        outPut[movie.Name] = {
          name: movie.Name,
          hot: movie.hot,
          logo: movie.logo[0].url,
          banner: movie.banner[0].url,
        };
      });
      state.movieLogos = outPut;
    },
    setType: (state, action) => {
      state.hotTypes = action.payload.filter((type) => type.hot);
    },
  },
});
export const { setMovie, setType } = displaySlice.actions;

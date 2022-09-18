import { configureStore } from "@reduxjs/toolkit";
import { itemSlice } from "./itemSlice/itemSlice";
import { headerSlice } from "./headerSlice/headerSlice";
import { cartSlice } from "./CartSlice/cartSlice";
import { displaySlice } from "./displaySlice/displaySlice";
import { newSlice } from "./NewsSlice/newSlice";

import { authSlice } from "./authSlice/authSlice";
export const store = configureStore({
  reducer: {
    itemList: itemSlice.reducer,
    headerState: headerSlice.reducer,
    itemCart: cartSlice.reducer,
    displayInfo: displaySlice.reducer,
    newList: newSlice.reducer,
    authentic: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const itemSelector = (state) => state.itemList;
export const headerState = (state) => state.headerState;
export const cartSelector = (state) => state.itemCart;
export const displaySelector = (state) => state.displayInfo;
export const newsSelector = (state) => state.newList;
export const authSelector = (state) => state.authentic;

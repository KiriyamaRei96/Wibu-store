import { createSlice, current } from "@reduxjs/toolkit";
import { updateCartData } from "../../firebaseStore/firebaseConfig";
let cartLocalStorage = localStorage.getItem("localCart");

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemCart: [],
  },
  reducers: {
    getLocalStore: (state, action) => {
      state.itemCart = action.payload;
    },
    addItem: (state, action) => {
      state.itemCart.push(action.payload);
      if (cartLocalStorage !== null && state.itemCart.length >= 0) {
        localStorage.setItem("localCart", JSON.stringify(state.itemCart));
      }
      updateCartData(current(state));
    },
    changeItem: (state, action) => {
      state.itemCart[action.payload.index] = action.payload.item;

      if (cartLocalStorage !== null && state.itemCart.length >= 0) {
        localStorage.setItem("localCart", JSON.stringify(state.itemCart));
      }
      updateCartData(current(state));
    },
    deleteItem: (state, action) => {
      state.itemCart = state.itemCart.filter(
        (item) => item.cartId !== action.payload
      );

      if (cartLocalStorage !== null && state.itemCart.length >= 0) {
        localStorage.setItem("localCart", JSON.stringify(state.itemCart));
      }
      updateCartData(current(state));
    },
    clearCart: (state) => {
      state.itemCart = [];

      if (cartLocalStorage !== null && state.itemCart.length >= 0) {
        localStorage.setItem("localCart", JSON.stringify(state.itemCart));
      }
      updateCartData(current(state));
    },
  },
});
export const { clearCart, getLocalStore, addItem, changeItem, deleteItem } =
  cartSlice.actions;

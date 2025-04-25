import { createSlice } from "@reduxjs/toolkit";

// import { toast } from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("toalItems"))
    : 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, value) {
      state.cart = value.payload;
    },

    //function add to cart
    // fun remove from cart
    // reset cart
  },
});

export const { setTotalItems } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index === -1) {
        state.products.push(action.payload);
        state.quantity = state.quantity + 1;
        state.totalPrice =
          state.totalPrice + action.payload.price * action.payload.quantity;
      } else {
        return;
      }
    },

    updateProduct: (state, action) => {
      state.products.map((item) => {
        if (item._id === action.payload.id) {
          if (action.payload.op === "plus") {
            return (
              (item.quantity = item.quantity + 1) &&
              (state.totalPrice = state.totalPrice + action.payload.price)
            );
          } else if (action.payload.op === "minus") {
            return item.quantity > 1
              ? (item.quantity = item.quantity - 1) &&
                  (state.totalPrice = state.totalPrice - action.payload.price)
              : item.quantity;
          }
        }
      });
    },

    deleteProduct: (state, action) => {
      state.quantity = state.quantity - 1;

      if (state.totalPrice < 0) {
        state.totalPrice = 0;
      }
      state.totalPrice =
        state.totalPrice - action.payload.price * action.payload.quantity;

      state.products = state.products.filter(
        (item) => item._id !== action.payload.productId
      );
    },

    deleteAllProducts: (state) => {
      state.quantity = 0;
      state.totalPrice = 0;
      state.products = [];
    },

    updateCartQuantity: (state, action) => {
      console.log("total quantity in redux -", action.payload);
      state.quantity = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  updateCartQuantity,
} = cartSlice.actions;
export const getQuantity = (state) => state.cart.quantity;
export const getProducts = (state) => state.cart.products;
export const getTotalPrice = (state) => state.cart.totalPrice;
export default cartSlice.reducer;

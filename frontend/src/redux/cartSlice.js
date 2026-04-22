import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedRam } = action.payload;
      
      // Check if product already exists in cart
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.selectedRam === selectedRam
      );

      if (existingItem) {
        // If exists, increment quantity
        existingItem.quantity += 1;
      } else {
        // If not exists, add new item
        state.items.push({
          ...product,
          selectedRam,
          quantity: 1,
        });
      }

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const { productId, selectedRam } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === productId && item.selectedRam === selectedRam)
      );

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { productId, selectedRam, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === productId && item.selectedRam === selectedRam
      );

      if (item) {
        if (quantity <= 0) {
          // Remove if quantity is 0 or less
          state.items = state.items.filter(
            (i) => !(i.id === productId && i.selectedRam === selectedRam)
          );
        } else {
          item.quantity = quantity;
        }
      }

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

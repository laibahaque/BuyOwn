// // frontend/src/redux/productsSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await axios.get(
//       "https://dummyjson.com/products/category/laptops"
//     );
//     return response.data.products;
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: { items: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laptops from "../Screens/BuyOwn/BuyOwn/frontend/src/data/laptops.json";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return laptops;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 Data mapping for UI
        state.items = action.payload.map((item) => ({
          ...item,
          title: item.model,
          thumbnail:
            item.gallery?.[0] ||
            item.colors?.[0]?.image ||
            "https://via.placeholder.com/150",
        }));
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
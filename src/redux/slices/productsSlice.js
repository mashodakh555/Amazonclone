import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../api/services/products";

const initialState = {
  isError: false,
  isLoaded: false,
  isLoading: true,
  data: [],
};

export const getRedProducts = createAsyncThunk(
  "products/getProducts",
  getProducts
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRedProducts.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoaded = true;
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default productsSlice.reducer;

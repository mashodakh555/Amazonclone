

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems } from './getCartItem';
import { removeCartItemBase } from './removeCartItem';

// Define the initial state
const initialState = {
  isLoggedIn: false,
  isLoaded: false,
  email: "",
  exp: 0,
  iat: 0,
  nameid: "",
  nbf: 0,
  role: undefined,
  unique_name: "",
  cartItems: {
    isLoading: true,
    isLoaded: false,
    isError: false,
    data: {},
  },
};

// Create an async thunk for getting cart items
export const getReduxCartItems = createAsyncThunk(
  "cart/items",
  getCartItems
);

// Create an async thunk for removing a cart item
export const removeCartItem = createAsyncThunk(
  "cart/remove",
  removeCartItemBase
);

// Create an async thunk for user logout
export const userLogout = createAsyncThunk("user/logout", async (_, { dispatch }) => {
  localStorage.removeItem("token");
  dispatch(resetUserState()); // Reset user state to initial state
});

// Create a user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reset user state to initial state
    resetUserState: (state) => {
      state.isLoggedIn = false;
      state.isLoaded = false;
      state.email = "";
      state.exp = 0;
      state.iat = 0;
      state.nameid = "";
      state.nbf = 0;
      state.role = undefined;
      state.unique_name = "";
      state.cartItems = {
        isLoading: true,
        isLoaded: false,
        isError: false,
        data: {},
      };
    },
    // Handle user login
    handleLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      for (let key in payload) {
        state[key] = payload[key];
      }
    },
    // Handle user logout
    handleLogout: (state) => {
      state.isLoggedIn = false;
      state.isLoaded = false;
      state.email = "";
      state.exp = 0;
      state.iat = 0;
      state.nameid = "";
      state.nbf = 0;
      state.role = undefined;
      state.unique_name = "";
      state.cartItems = {
        isLoading: true,
        isLoaded: false,
        isError: false,
        data: {},
      };
      localStorage.removeItem("token");
    },
    // Handle adding a product to the cart
    handleAddProduct: (state, action) => {
      state.cartItems.data[action.payload.id] = action.payload;
    },
    // Handle removing a product from the cart optimistically
    handleRemoveOptimisticProduct: (state, action) => {
      delete state.cartItems.data[action.payload];
    },
    // Handle input changes (for other user properties)
    handleInputChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReduxCartItems.fulfilled, (state, action) => {
        state.cartItems.isLoaded = true;
        state.cartItems.isLoading = false;
        state.cartItems.isError = false;
        const newObj = {};
        action.payload.forEach((product) => {
          newObj[product.id] = product;
        });
        state.cartItems.data = newObj;
      })
      .addCase(removeCartItem.fulfilled, (state, { payload }) => {
        if (payload) {
          delete state.cartItems.data[payload];
        }
      });
  },
});


export const {
  resetUserState,
  handleLogin,
  handleLogout,
  handleAddProduct,
  handleRemoveOptimisticProduct,
  handleInputChange,
} = userSlice.actions;

export default userSlice.reducer;
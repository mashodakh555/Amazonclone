import { getCartItems } from "../../api/services/cart";
import { removeCartItemBase } from "../../api/services/cart";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  tokenExpired: false,
};

export const getReduxCartItems = createAsyncThunk("cart/items", getCartItems);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  removeCartItemBase
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      for (let key in payload) {
        state[key] = payload[key];
      }
    },
    handleLogout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      state = {
        email: "",
        exp: 0,
        iat: 0,
        nameid: "",
        nbf: 0,
        role: "",
        unique_name: "",
      };
    },
    handleAddProduct: (state, action) => {
      state.cartItems.data[action.payload.id] = action.payload;
    },
    handleRemoveOptimisticProduct: (state, action) => {
      delete state.cartItems.data[action.payload];
    },
    handleInputChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    setTokenExpired: (state, action) => {
      state.tokenExpired = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getReduxCartItems.fulfilled, (state, action) => {
        state.cartItems.isLoaded = true;
        state.cartItems.isLoading = false;
        state.cartItems.isError = false;
        const newObj = {};
        action?.payload?.forEach((product) => {
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
  handleLogin,
  handleLogout,
  handleAddProduct,
  handleRemoveOptimisticProduct,
  handleInputChange,
  setTokenExpired,
} = userSlice.actions;

export default userSlice.reducer;

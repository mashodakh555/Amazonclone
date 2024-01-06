import { configureStore } from "@reduxjs/toolkit";
import amazonSlice from "./slices/amazonSlice";
import productsSlice from "./slices/productsSlice";
import usersSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    amazon: amazonSlice,
    products: productsSlice,
    user: usersSlice,
  },
});

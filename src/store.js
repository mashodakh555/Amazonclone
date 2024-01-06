import {configureStore} from '@reduxjs/toolkit';
 import amazonSlice from './../redux/amazonSlice';
 import productsSlice from './productsSlice';
 import usersSlice from './userSlice';


 export const store = configureStore({
     reducer: {
       amazon: amazonSlice,
       products: productsSlice,
       user: usersSlice,
     }
 })

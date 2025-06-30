// import { combineReducers } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { CategoriesReducer } from './category/categoryReducer';
import { userReducer } from './user/userReducer'
import { cartReducer } from './cart/cartReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: CategoriesReducer,
  cart: cartReducer,
});

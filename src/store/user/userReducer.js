import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signInFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    signOutStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    signOutSuccess(state) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
    signOutFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    signUpStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    signUpFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Optionally signUpSuccess if you want to handle it explicitly
  },
});


export const {
  signInStart,
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpStart,
  signUpFailed,
} = userSlice.actions;

export const userReducer = userSlice.reducer;


// Key differences:

// 1. createSlice: RTK's createSlice function generates the reducer and actions for you.
// 2. Reducers as objects: Instead of a switch statement, reducers are defined as objects with functions.
// 3. Immer integration: RTK uses Immer under the hood, allowing for mutable updates in reducers.
// 4. Action creators: RTK generates action creators for you, eliminating the need for manual action type definitions.

// Benefits:

// 1. Less boilerplate code
// 2. Improved readability
// 3. Simplified state management

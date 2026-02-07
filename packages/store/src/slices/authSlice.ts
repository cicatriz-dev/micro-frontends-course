import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthResponse } from '@repo/types';

// ============================================
// State Interface
// ============================================

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ============================================
// Slice
// ============================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login/Register success
    authSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    // Set loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Update user
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// ============================================
// Actions
// ============================================

export const { authSuccess, logout, setLoading, setError, clearError, updateUser } =
  authSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

// ============================================
// Reducer
// ============================================

export default authSlice.reducer;

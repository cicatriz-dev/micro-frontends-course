import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import booksReducer from './slices/booksSlice';
import favoritesReducer from './slices/favoritesSlice';

// ============================================
// Store Factory
// ============================================

export function createSharedStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      books: booksReducer,
      favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['auth/authSuccess'],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.createdAt'],
          // Ignore these paths in the state
          ignoredPaths: ['auth.user.createdAt'],
        },
      }),
  });
}

// ============================================
// Types
// ============================================

export type RootState = ReturnType<ReturnType<typeof createSharedStore>['getState']>;
export type AppDispatch = ReturnType<typeof createSharedStore>['dispatch'];

// ============================================
// Export Slices (as namespaces to avoid name conflicts)
// ============================================

import * as authSliceExports from './slices/authSlice';
import * as cartSliceExports from './slices/cartSlice';
import * as booksSliceExports from './slices/booksSlice';
import * as favoritesSliceExports from './slices/favoritesSlice';

export const authSlice = authSliceExports;
export const cartSlice = cartSliceExports;
export const booksSlice = booksSliceExports;
export const favoritesSlice = favoritesSliceExports;

// Export types
export type { AuthState } from './slices/authSlice';
export type { CartState } from './slices/cartSlice';
export type { BooksState } from './slices/booksSlice';
export type { FavoritesState } from './slices/favoritesSlice';

// ============================================
// Export Hooks (to be used in apps)
// ============================================

// Note: Apps should create their own typed hooks using these types
// Example in app:
// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '@repo/store';
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

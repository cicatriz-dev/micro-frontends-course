import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '@repo/types';

// ============================================
// State Interface
// ============================================

export interface FavoritesState {
  books: Book[];
}

const initialState: FavoritesState = {
  books: [],
};

// ============================================
// Slice
// ============================================

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Add book to favorites
    addToFavorites: (state, action: PayloadAction<Book>) => {
      const exists = state.books.find((book) => book.id === action.payload.id);
      if (!exists) {
        state.books.push(action.payload);
      }
    },

    // Remove book from favorites
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },

    // Toggle favorite (add if not exists, remove if exists)
    toggleFavorite: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex((book) => book.id === action.payload.id);
      if (index >= 0) {
        state.books.splice(index, 1);
      } else {
        state.books.push(action.payload);
      }
    },

    // Clear all favorites
    clearFavorites: (state) => {
      state.books = [];
    },
  },
});

// ============================================
// Actions
// ============================================

export const { addToFavorites, removeFromFavorites, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites;
export const selectFavoriteBooks = (state: { favorites: FavoritesState }) =>
  state.favorites.books;
export const selectFavoritesCount = (state: { favorites: FavoritesState }) =>
  state.favorites.books.length;
export const selectIsFavorite = (bookId: string) => (state: { favorites: FavoritesState }) =>
  state.favorites.books.some((book) => book.id === bookId);

// ============================================
// Reducer
// ============================================

export default favoritesSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '@repo/types';

// ============================================
// State Interface
// ============================================

export interface BooksState {
  books: Book[];
  filteredBooks: Book[];
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  filteredBooks: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  isLoading: false,
  error: null,
};

// ============================================
// Slice
// ============================================

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Set books
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.filteredBooks = action.payload;
      state.isLoading = false;
    },

    // Set categories
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },

    // Set selected category
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      console.log('✅ Redux: setSelectedCategory reducer called with:', action.payload);
      state.selectedCategory = action.payload;
      applyFilters(state);
      console.log('✅ Redux: filteredBooks count:', state.filteredBooks.length);
    },

    // Set search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      console.log('✅ Redux: setSearchQuery reducer called with:', action.payload);
      state.searchQuery = action.payload;
      applyFilters(state);
      console.log('✅ Redux: filteredBooks count:', state.filteredBooks.length);
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

    // Clear filters
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.searchQuery = '';
      state.filteredBooks = state.books;
    },
  },
});

// ============================================
// Helper Functions
// ============================================

function applyFilters(state: BooksState) {
  let filtered = state.books;

  // Filter by category
  if (state.selectedCategory) {
    filtered = filtered.filter((book) => book.category === state.selectedCategory);
  }

  // Filter by search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );
  }

  state.filteredBooks = filtered;
}

// ============================================
// Actions
// ============================================

export const {
  setBooks,
  setCategories,
  setSelectedCategory,
  setSearchQuery,
  setLoading,
  setError,
  clearFilters,
} = booksSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectBooks = (state: { books: BooksState }) => state.books;
export const selectAllBooks = (state: { books: BooksState }) => state.books.books;
export const selectFilteredBooks = (state: { books: BooksState }) => state.books.filteredBooks;
export const selectCategories = (state: { books: BooksState }) => state.books.categories;
export const selectSelectedCategory = (state: { books: BooksState }) =>
  state.books.selectedCategory;
export const selectSearchQuery = (state: { books: BooksState }) => state.books.searchQuery;
export const selectBooksLoading = (state: { books: BooksState }) => state.books.isLoading;
export const selectBooksError = (state: { books: BooksState }) => state.books.error;

// ============================================
// Reducer
// ============================================

export default booksSlice.reducer;

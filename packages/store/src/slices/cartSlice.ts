import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book, CartItem } from '@repo/types';

// ============================================
// State Interface
// ============================================

export interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

// ============================================
// Helper Functions
// ============================================

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
}

// ============================================
// Slice
// ============================================

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find((item) => item.book.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          book: action.payload,
          quantity: 1,
        });
      }

      state.total = calculateTotal(state.items);
    },

    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.book.id !== action.payload);
      state.total = calculateTotal(state.items);
    },

    // Update quantity
    updateQuantity: (state, action: PayloadAction<{ bookId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.book.id === action.payload.bookId);

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((item) => item.book.id !== action.payload.bookId);
        } else {
          item.quantity = action.payload.quantity;
        }
      }

      state.total = calculateTotal(state.items);
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

// ============================================
// Actions
// ============================================

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectCart = (state: { cart: CartState }) => state.cart;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// ============================================
// Reducer
// ============================================

export default cartSlice.reducer;

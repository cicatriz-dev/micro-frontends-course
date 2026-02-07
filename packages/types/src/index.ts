// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

// ============================================
// Authentication Types
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================
// Book Types
// ============================================

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  coverUrl: string;
  description: string;
}

export interface BooksResponse {
  books: Book[];
  total: number;
}

export interface BooksQuery {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================
// Cart Types
// ============================================

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

// ============================================
// API Error Types
// ============================================

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// ============================================
// Category Types
// ============================================

export type BookCategory =
  | 'Programming'
  | 'Fiction'
  | 'Self-Help'
  | 'Business'
  | 'Design'
  | 'Science'
  | 'History';

export interface CategoriesResponse {
  categories: BookCategory[];
}

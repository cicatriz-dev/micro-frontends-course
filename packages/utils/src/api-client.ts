import type { ApiError, ApiResponse } from '@repo/types';

// ============================================
// API Configuration
// ============================================

// Note: Apps can override this by setting window.VITE_API_URL or process.env.VITE_API_URL
export const API_BASE_URL =
  (typeof window !== 'undefined' && (window as any).VITE_API_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_API_URL) ||
  'http://localhost:3001';

// ============================================
// Custom Error Class
// ============================================

export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// ============================================
// Fetch Wrapper
// ============================================

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function fetchWithError<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Add default headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // Parse response
  const data = await response.json();

  // Handle errors
  if (!response.ok) {
    const error = data as ApiError;
    throw new ApiClientError(
      error.message || 'Erro na requisição',
      response.status,
      error.errors
    );
  }

  return data as T;
}

// ============================================
// HTTP Methods
// ============================================

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    fetchWithError<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    fetchWithError<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    fetchWithError<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    fetchWithError<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    fetchWithError<T>(endpoint, { ...options, method: 'DELETE' }),
};

// ============================================
// Auth Token Management
// ============================================

const AUTH_TOKEN_KEY = 'auth_token';

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function removeAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function hasAuthToken(): boolean {
  return !!getAuthToken();
}

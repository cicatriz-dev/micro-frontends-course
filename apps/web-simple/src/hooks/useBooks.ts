import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { booksSlice } from '@repo/store';
import { apiClient } from '@repo/utils';
import type { Book } from '@repo/types';

export function useBooks() {
  const dispatch = useAppDispatch();
  const {
    filteredBooks,
    categories,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
  } = useAppSelector((state) => state.books);

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  async function fetchBooks() {
    try {
      dispatch(booksSlice.setLoading(true));
      const response = await apiClient.get<{ books: Book[] }>('/api/books', {
        params: { limit: 100 },
      });
      dispatch(booksSlice.setBooks(response.books));
    } catch (err) {
      dispatch(booksSlice.setError('Erro ao carregar livros'));
      console.error('Error fetching books:', err);
    }
  }

  async function fetchCategories() {
    try {
      const response = await apiClient.get<{ categories: string[] }>('/api/categories');
      dispatch(booksSlice.setCategories(response.categories));
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }

  function setCategory(category: string | null) {
    console.log('🔵 setCategory called with:', category);
    dispatch(booksSlice.setSelectedCategory(category));
  }

  function setSearch(query: string) {
    console.log('🔍 setSearch called with:', query);
    dispatch(booksSlice.setSearchQuery(query));
  }

  function clearFilters() {
    dispatch(booksSlice.clearFilters());
  }

  return {
    books: filteredBooks,
    categories,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
    setCategory,
    setSearch,
    clearFilters,
    refetch: fetchBooks,
  };
}

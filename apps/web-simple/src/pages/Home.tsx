import { useState } from 'react';
import { LoadingPage } from '@repo/ui';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from '../components/BookCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { Header } from '../components/Header';
import { BookDetailsModal } from '../components/BookDetailsModal';
import type { Book } from '@repo/types';

export function Home() {
  const {
    books,
    categories,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
    setCategory,
    setSearch,
  } = useBooks();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleLoginClick = () => {
    console.log('Login clicked - implementar modal de login');
    // TODO: Abrir modal de login
  };

  const handleFavoritesClick = () => {
    console.log('Favorites clicked - implementar modal de favoritos');
    // TODO: Abrir modal de favoritos
  };

  const handleProfileClick = () => {
    console.log('Profile clicked - implementar dropdown de perfil');
    // TODO: Abrir dropdown de perfil com opção de logout
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseBookDetails = () => {
    setSelectedBook(null);
  };

  if (isLoading && books.length === 0) {
    return <LoadingPage message="Carregando livros..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar livros</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Login/Profile */}
      <Header
        onLoginClick={handleLoginClick}
        onFavoritesClick={handleFavoritesClick}
        onProfileClick={handleProfileClick}
      />

      {/* Search and Filters */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search */}
          <div className="mb-6">
            <SearchBar value={searchQuery} onChange={setSearch} />
          </div>

          {/* Category Filters */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setCategory}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            {books.length === 0 ? (
              'Nenhum livro encontrado'
            ) : (
              <>
                Mostrando <span className="font-semibold">{books.length}</span> livro
                {books.length !== 1 && 's'}
                {selectedCategory && (
                  <>
                    {' '}
                    em <span className="font-semibold">{selectedCategory}</span>
                  </>
                )}
                {searchQuery && (
                  <>
                    {' '}
                    para <span className="font-semibold">"{searchQuery}"</span>
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum livro encontrado com os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onBookClick={handleBookClick} />
            ))}
          </div>
        )}
      </main>

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBook}
        isOpen={selectedBook !== null}
        onClose={handleCloseBookDetails}
      />
    </div>
  );
}

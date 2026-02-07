import { Card, CardContent, CardFooter } from '@repo/ui';
import { formatPrice } from '@repo/utils';
import type { Book } from '@repo/types';
import { useAppDispatch, useAppSelector } from '../store';
import { favoritesSlice } from '@repo/store';

interface BookCardProps {
  book: Book;
  onBookClick?: (book: Book) => void;
}

// Generate a gradient color based on book ID
function getGradient(id: string): string {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  ];
  const index = parseInt(id, 10) % gradients.length;
  return gradients[index];
}

export function BookCard({ book, onBookClick }: BookCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.books.some((b) => b.id === book.id)
  );

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    dispatch(favoritesSlice.toggleFavorite(book));
  };

  const handleCardClick = () => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Book Cover with gradient placeholder */}
      <div
        className="relative h-48 flex items-center justify-center"
        style={{ background: getGradient(book.id) }}
      >
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
            isFavorite
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white/90 text-gray-600 hover:bg-white'
          }`}
          title={isFavorite ? 'Remover da prateleira' : 'Adicionar à prateleira'}
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>

        <svg className="w-16 h-16 text-white opacity-40" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
            {book.category}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{book.description}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-2 flex justify-between items-center">
        <span className="text-xl font-bold text-primary-600">
          {formatPrice(book.price)}
        </span>
      </CardFooter>
    </Card>
  );
}

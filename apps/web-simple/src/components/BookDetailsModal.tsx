import { Modal, Button } from '@repo/ui';
import { formatPrice } from '@repo/utils';
import type { Book } from '@repo/types';
import { useAppDispatch, useAppSelector } from '../store';
import { favoritesSlice } from '@repo/store';

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
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

export function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    book ? state.favorites.books.some((b) => b.id === book.id) : false
  );

  if (!book) return null;

  const handleToggleFavorite = () => {
    dispatch(favoritesSlice.toggleFavorite(book));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-4xl w-full">
        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 md:top-0 md:right-0 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Left Column - Book Cover */}
          <div className="flex-shrink-0 w-full md:w-48">
            <div
              className="w-full aspect-[2/3] rounded-lg shadow-md flex items-center justify-center relative overflow-hidden"
              style={{ background: getGradient(book.id) }}
            >
              <svg className="w-16 h-16 text-white opacity-30" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          </div>

          {/* Right Column - Book Info */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Category Badge */}
            <span className="inline-flex items-center self-start text-xs font-semibold text-primary-700 bg-primary-100 px-3 py-1 rounded-full mb-3">
              {book.category}
            </span>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              {book.title}
            </h2>

            {/* Author */}
            <p className="text-base text-gray-600 mb-4">
              por <span className="font-medium text-gray-900">{book.author}</span>
            </p>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Sobre o livro
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-1">Preço</p>
              <p className="text-3xl font-bold text-primary-600">
                {formatPrice(book.price)}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-auto">
              <button
                onClick={handleToggleFavorite}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  isFavorite
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-600 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>
                  {isFavorite ? 'Remover da Prateleira' : 'Adicionar à Prateleira'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

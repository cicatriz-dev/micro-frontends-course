import { useAppSelector } from '../store';
import { Button } from '@repo/ui';

interface HeaderProps {
  onLoginClick: () => void;
  onFavoritesClick: () => void;
  onProfileClick: () => void;
}

export function Header({ onLoginClick, onFavoritesClick, onProfileClick }: HeaderProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const favoritesCount = useAppSelector((state) => state.favorites.books.length);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              LeiaAqui
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Favorites/Prateleira */}
                <button
                  onClick={onFavoritesClick}
                  className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Minha Prateleira"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </button>

                {/* User Profile */}
                <button
                  onClick={onProfileClick}
                  className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title={user?.name || 'Perfil'}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">
                    {user?.name || 'Usuário'}
                  </span>
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Button onClick={onLoginClick} variant="primary" size="sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Entrar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

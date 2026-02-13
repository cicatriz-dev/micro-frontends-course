import { useEffect, useState, lazy, Suspense } from 'react';
import { Home } from './pages/Home';

// Lazy import condicional apenas do componente necessário
// O Vite faz tree-shaking em build time baseado em import.meta.env
const LoginPage =
	import.meta.env.VITE_AULA_MODE === 'aula2'
		? lazy(() => import('./pages/LoginAula2').then((m) => ({ default: m.LoginAula2 })))
		: import.meta.env.VITE_AULA_MODE === 'aula3'
			? lazy(() => import('./pages/LoginAula3').then((m) => ({ default: m.LoginAula3 })))
			: lazy(() => import('./pages/LoginAula4').then((m) => ({ default: m.LoginAula4 })));

function App() {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const handlePopState = () => {
			setCurrentPath(window.location.pathname);
		};

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	if (currentPath === '/login') {
		return (
			<Suspense
				fallback={
					<div className='min-h-screen flex items-center justify-center'>
						<div className='text-lg text-gray-600'>Carregando...</div>
					</div>
				}
			>
				<LoginPage />
			</Suspense>
		);
	}

	return <Home />;
}

export default App;

import { useEffect, useState } from 'react';
import { Home } from './pages/Home';

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
			<>
				<div className='fixed top-4 left-4 z-50'>
					<button
						onClick={() => {
							window.history.pushState({}, '', '/');
							setCurrentPath('/');
						}}
						className='px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg'
					>
						← Voltar para Home
					</button>
				</div>
			</>
		);
	}

	return <Home />;
}

export default App;

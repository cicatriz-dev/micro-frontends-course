import { lazy, Suspense } from 'react';

const LoginAppMF = lazy(() => import('mfeLogin/LoginApp'));

export function LoginAula3() {
	return (
		<>
			<div className='fixed top-4 left-4 z-50'>
				<button
					onClick={() => {
						window.history.pushState({}, '', '/');
						window.dispatchEvent(new PopStateEvent('popstate'));
					}}
					className='px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg'
				>
					← Voltar para Home
				</button>
			</div>
			<Suspense
				fallback={
					<div className='min-h-screen flex items-center justify-center'>
						<div className='text-lg text-gray-600'>Carregando...</div>
					</div>
				}
			>
				<LoginAppMF />
			</Suspense>
		</>
	);
}

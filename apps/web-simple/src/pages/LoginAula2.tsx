export function LoginAula2() {
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
			{/* Container onde Single-SPA vai montar o MFE */}
			<div id='mfe-login-container'></div>
		</>
	);
}

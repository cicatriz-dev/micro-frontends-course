import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import { getMFEConfig } from './config/mfe-config';

declare global {
	interface Window {
		System: {
			import<T = any>(module: string): Promise<T>;
		};
		__SHARED_STORE__: any;
	}
}

const resizeObserverErrHandler = (e: ErrorEvent) => {
	if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
		e.stopImmediatePropagation();
	}
};

window.addEventListener('error', resizeObserverErrHandler);

// Registrar Single-SPA apenas para aula2
const mfeConfig = getMFEConfig();

if (mfeConfig.mode === 'aula2') {
	// Importar dinamicamente single-spa apenas quando necessário
	import('single-spa').then(({ registerApplication, start }) => {
		registerApplication({
			name: '@mfe/login',
			app: () => window.System.import('@mfe/login'),
			activeWhen: (location) => location.pathname === '/login',
			customProps: {
				domElement: document.getElementById('mfe-login-container'),
			},
		});

		start({
			urlRerouteOnly: true,
		});
	});
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);

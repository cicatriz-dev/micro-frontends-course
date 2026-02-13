import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginApp from './LoginApp';
import './index.css';

if (!window.__SHARED_STORE__) {
	const { createSharedStore } = await import('@repo/store');
	window.__SHARED_STORE__ = createSharedStore();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<LoginApp />
	</React.StrictMode>,
);

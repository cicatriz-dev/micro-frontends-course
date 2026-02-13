import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'web-simple',
			dts: false,
			remotes: {
				mfeLoginNative: {
					// ⭐ Nova sintaxe (objeto)
					type: 'module',
					name: 'mfeLoginNative',
					entry: 'http://localhost:5002/remoteEntry.js', // ⭐ Raiz, não /assets/
				},
			},
			shared: {
				react: {
					singleton: true,
					requiredVersion: '^18.2.0',
				},
				'react-dom': {
					singleton: true,
					requiredVersion: '^18.2.0',
				},
				'react-redux': {
					singleton: true,
					requiredVersion: '^9.0.0',
				},
			},
		}),
	],
	build: {
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		port: 3000,
	},
});

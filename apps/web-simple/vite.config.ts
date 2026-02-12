import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'web-simple',
			remotes: {
				mfeLogin: 'http://localhost:5001/assets/remoteEntry.js',
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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'mfeLoginNative', // ⭐ Nome do remote
			filename: 'remoteEntry.js', // ⭐ Arquivo manifesto
			dts: false, // ⭐ Desabilitar DTS (evita erros)
			exposes: {
				'./LoginApp': './src/LoginApp', // ⭐ Expor componente
			},
			shared: {
				react: {
					singleton: true, // ⭐ Uma única instância
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
		modulePreload: false, // ⭐ Desabilitar preload
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		port: 5002,
		cors: true, // ⭐ Habilitar CORS
	},
	preview: {
		port: 5002,
		cors: true,
	},
});

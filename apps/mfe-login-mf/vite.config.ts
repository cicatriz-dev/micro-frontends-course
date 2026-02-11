import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'mfeLogin', // ⭐ Nome do remote
			filename: 'remoteEntry.js', // ⭐ Arquivo manifesto
			exposes: {
				'./LoginApp': './src/LoginApp', // ⭐ Expor componente
			},
			shared: {
				react: {
					singleton: true, // ⭐ Uma única instância
					requiredVersion: '^18.2.0', // ⭐ Versão obrigatória
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
		port: 5001,
		cors: true, // ⭐ Habilitar CORS
	},
	preview: {
		port: 5001,
		cors: true, // ⭐ Preview na mesma porta
	},
});

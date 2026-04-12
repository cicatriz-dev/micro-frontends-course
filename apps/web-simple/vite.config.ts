import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation as nativeFederation } from '@module-federation/vite';
import originjsFederation from '@originjs/vite-plugin-federation';

export default defineConfig({
	plugins: [
		react(),
		// Configurar federation baseado no modo
		// Para evitar erros de resolução, configuramos ambos os remotes sempre
		// mas apenas o modo ativo será usado em runtime
		...(process.env.VITE_AULA_MODE === 'aula2'
			? []
			: process.env.VITE_AULA_MODE === 'aula3'
				? [
						originjsFederation({
							name: 'web-simple',
							remotes: {
								mfeLogin: 'http://localhost:5001/assets/remoteEntry.js',
								// Incluir mfeLoginNative para evitar erro de resolução
								mfeLoginNative: 'http://localhost:5002/remoteEntry.js',
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
							} as any, // Type assertion para compatibilidade @originjs
						}),
					]
				: [
						// aula4 ou default
						nativeFederation({
							name: 'web-simple',
							dts: false,
							remotes: {
								// Incluir ambos para evitar erro de resolução
								mfeLogin: {
									type: 'module',
									name: 'mfeLogin',
									entry: 'http://localhost:5001/assets/remoteEntry.js',
								},
								mfeLoginNative: {
									type: 'module',
									name: 'mfeLoginNative',
									entry: 'http://localhost:5002/remoteEntry.js',
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
					]),
	],
	build: {
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
		},
	},
});

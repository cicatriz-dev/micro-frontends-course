/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AULA_MODE?: 'aula2' | 'aula3' | 'aula4';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Module Federation - Dynamic import
declare module 'mfeLogin/LoginApp' {
	const LoginApp: React.ComponentType;
	export default LoginApp;
}

// Native Federation - Dynamic import
declare module 'mfeLoginNative/LoginApp' {
	const LoginApp: React.ComponentType;
	export default LoginApp;
}

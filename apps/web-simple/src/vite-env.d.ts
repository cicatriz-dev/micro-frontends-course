/// <reference types="vite/client" />

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

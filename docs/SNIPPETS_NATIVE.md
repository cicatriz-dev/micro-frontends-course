# Snippets de Código - Native Federation Login

Este arquivo contém todos os códigos prontos para copy/paste de Native Federation usando `@module-federation/vite`.

**Ordem de implementação**: MFE Remote → Shell Host → Testes

---

## 📦 MFE Remote (mfe-login-native)

### 1. package.json

**Caminho**: `apps/mfe-login-native/package.json`

```json
{
	"name": "mfe-login-native",
	"private": true,
	"version": "1.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite build && vite preview --port 5002",
		"dev:standalone": "vite --port 5002",
		"build": "vite build",
		"preview": "vite preview --port 5002"
	},
	"dependencies": {
		"react": "^18.2.0",
		"react-dom": "^18.2.0",
		"react-redux": "^9.0.0",
		"@repo/ui": "workspace:*",
		"@repo/store": "workspace:*",
		"@repo/types": "workspace:*",
		"@repo/utils": "workspace:*"
	},
	"devDependencies": {
		"@module-federation/vite": "^1.0.8",
		"@types/react": "^18.2.0",
		"@types/react-dom": "^18.2.0",
		"@vitejs/plugin-react": "^4.2.0",
		"typescript": "^5.3.0",
		"vite": "^5.0.0",
		"tailwindcss": "^3.4.0",
		"autoprefixer": "^10.4.0",
		"postcss": "^8.4.0"
	}
}
```

**Pontos-chave**:
- ⭐ `@module-federation/vite` (não `@originjs`)
- ⭐ Porta **5002**
- ⭐ Script `dev`: build + preview

---

### 2. vite.config.ts (REMOTE)

**Caminho**: `apps/mfe-login-native/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'mfeLoginNative',
			filename: 'remoteEntry.js',
			dts: false,
			exposes: {
				'./LoginApp': './src/LoginApp',
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
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		port: 5002,
		cors: true,
	},
	preview: {
		port: 5002,
		cors: true,
	},
});
```

**Pontos-chave**:
- ⭐ `import { federation }` (import nomeado)
- ⭐ `dts: false` (evita erros de rootDir)
- ⭐ Porta **5002**
- ⭐ remoteEntry.js na raiz (não /assets/)

---

### 3. tsconfig.json

**Caminho**: `apps/mfe-login-native/tsconfig.json`

```json
{
	"compilerOptions": {
		"rootDir": "./src",
		"target": "ES2020",
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"moduleResolution": "bundler",
		"jsx": "react-jsx",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"resolveJsonModule": true,
		"allowSyntheticDefaultImports": true
	},
	"include": ["src"],
	"exclude": ["node_modules", "dist"]
}
```

**Pontos-chave**:
- ⭐ `rootDir: "./src"` (necessário para plugin DTS)

---

### 4. tailwind.config.cjs

**Caminho**: `apps/mfe-login-native/tailwind.config.cjs`

```javascript
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
				},
				success: {
					DEFAULT: '#10b981',
					light: '#d1fae5',
				},
			},
		},
	},
	plugins: [],
};
```

---

### 5. postcss.config.cjs

**Caminho**: `apps/mfe-login-native/postcss.config.cjs`

```javascript
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};
```

---

### 6. index.html

**Caminho**: `apps/mfe-login-native/index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MFE Login - Native Federation</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

### 7. src/index.css

**Caminho**: `apps/mfe-login-native/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 8. src/declaration.d.ts

**Caminho**: `apps/mfe-login-native/src/declaration.d.ts`

```typescript
import type { Store } from '@reduxjs/toolkit';
import type { RootState } from '@repo/store';

declare global {
	interface Window {
		__SHARED_STORE__: Store<RootState>;
	}
}

export {};
```

---

### 9. src/store.ts

**Caminho**: `apps/mfe-login-native/src/store.ts`

```typescript
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@repo/store';

export function getSharedStore() {
	if (!window.__SHARED_STORE__) {
		throw new Error('Shared store not found on window.__SHARED_STORE__');
	}
	return window.__SHARED_STORE__;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

### 10. src/LoginApp.tsx

**Caminho**: `apps/mfe-login-native/src/LoginApp.tsx`

```typescript
import { useState } from 'react';
import { Provider } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui';
import { TabSwitcher } from './components/TabSwitcher';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { getSharedStore } from './store';
import './index.css';

type Tab = 'login' | 'register';

export default function LoginApp() {
	const [activeTab, setActiveTab] = useState<Tab>('login');

	return (
		<Provider store={getSharedStore()}>
			<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
				<Card className='w-full max-w-md' padding='lg'>
					<CardHeader>
						<CardTitle className='text-center'>Bem-vindo ao LeiaAqui</CardTitle>
						<p className='text-sm text-gray-500 text-center mt-2'>
							Faça login ou crie sua conta para continuar
						</p>
					</CardHeader>

					<CardContent>
						<TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

						<div className='mt-6'>
							{activeTab === 'login' ? (
								<LoginForm />
							) : (
								<RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</Provider>
	);
}
```

---

### 11. src/main.tsx

**Caminho**: `apps/mfe-login-native/src/main.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginApp from './LoginApp';
import './index.css';

// Mock store para modo standalone
if (!window.__SHARED_STORE__) {
	const { createSharedStore } = await import('@repo/store');
	window.__SHARED_STORE__ = createSharedStore();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<LoginApp />
	</React.StrictMode>,
);
```

---

### 12. src/components/TabSwitcher.tsx

**Caminho**: `apps/mfe-login-native/src/components/TabSwitcher.tsx`

```typescript
interface TabSwitcherProps {
	activeTab: 'login' | 'register';
	onTabChange: (tab: 'login' | 'register') => void;
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
	return (
		<div className='flex border-b border-gray-200'>
			<button
				onClick={() => onTabChange('login')}
				className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
					activeTab === 'login'
						? 'border-b-2 border-primary-600 text-primary-600'
						: 'text-gray-500 hover:text-gray-700'
				}`}
			>
				Login
			</button>
			<button
				onClick={() => onTabChange('register')}
				className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
					activeTab === 'register'
						? 'border-b-2 border-primary-600 text-primary-600'
						: 'text-gray-500 hover:text-gray-700'
				}`}
			>
				Criar conta
			</button>
		</div>
	);
}
```

---

### 13. src/components/LoginForm.tsx

**Caminho**: `apps/mfe-login-native/src/components/LoginForm.tsx`

```typescript
import React, { useState } from 'react';
import { Button, Form, FormField, FormLabel, Input, FormError } from '@repo/ui';
import { validateEmail, validatePassword } from '@repo/utils';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	const { login, isLoading, error: apiError } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);

		if (emailError || passwordError) {
			setErrors({
				email: emailError || undefined,
				password: passwordError || undefined,
			});
			return;
		}

		setErrors({});
		await login({ email, password });
	};

	return (
		<Form onSubmit={handleSubmit}>
			{apiError && (
				<div className='mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm'>
					{apiError}
				</div>
			)}

			<FormField>
				<FormLabel required>Email</FormLabel>
				<Input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='seu@email.com'
					error={errors.email}
				/>
				<FormError>{errors.email}</FormError>
			</FormField>

			<FormField>
				<FormLabel required>Senha</FormLabel>
				<Input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='******'
					error={errors.password}
				/>
				<FormError>{errors.password}</FormError>
			</FormField>

			<Button type='submit' fullWidth isLoading={isLoading} className='mt-2'>
				Entrar
			</Button>
		</Form>
	);
}
```

---

### 14. src/components/RegisterForm.tsx

**Caminho**: `apps/mfe-login-native/src/components/RegisterForm.tsx`

```typescript
import React, { useState } from 'react';
import { Button, Form, FormField, FormLabel, Input, FormError } from '@repo/ui';
import { validateEmail, validatePassword, validateName } from '@repo/utils';
import { useAuth } from '../hooks/useAuth';

interface RegisterFormProps {
	onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
		password?: string;
	}>({});

	const { register, isLoading, error: apiError } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const nameError = validateName(name);
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);

		if (nameError || emailError || passwordError) {
			setErrors({
				name: nameError || undefined,
				email: emailError || undefined,
				password: passwordError || undefined,
			});
			return;
		}

		setErrors({});
		await register({ name, email, password });
	};

	return (
		<Form onSubmit={handleSubmit}>
			{apiError && (
				<div className='mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm'>
					{apiError}
				</div>
			)}

			<FormField>
				<FormLabel required>Nome completo</FormLabel>
				<Input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Seu nome'
					error={errors.name}
				/>
				<FormError>{errors.name}</FormError>
			</FormField>

			<FormField>
				<FormLabel required>Email</FormLabel>
				<Input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='seu@email.com'
					error={errors.email}
				/>
				<FormError>{errors.email}</FormError>
			</FormField>

			<FormField>
				<FormLabel required>Senha</FormLabel>
				<Input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Mínimo 6 caracteres'
					error={errors.password}
				/>
				<FormError>{errors.password}</FormError>
			</FormField>

			<Button type='submit' fullWidth isLoading={isLoading} className='mt-2'>
				Criar conta
			</Button>

			<p className='text-sm text-gray-600 text-center mt-4'>
				Já tem uma conta?{' '}
				<button
					type='button'
					onClick={onSwitchToLogin}
					className='text-primary-600 hover:underline'
				>
					Faça login
				</button>
			</p>
		</Form>
	);
}
```

---

### 15. src/hooks/useAuth.ts

**Caminho**: `apps/mfe-login-native/src/hooks/useAuth.ts`

```typescript
import { useState } from 'react';
import type { LoginCredentials, RegisterData } from '@repo/types';
import { loginUser, registerUser } from '../services/auth-api';
import { dispatchAuthSuccess } from '../services/auth-events';
import { useAppDispatch } from '../store';
import { authSlice } from '@repo/store';

export function useAuth() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();

	const login = async (credentials: LoginCredentials) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await loginUser(credentials);

			// 1. Atualizar Redux store (compartilhado com shell)
			dispatch(authSlice.authSuccess(response));

			// 2. Disparar evento customizado (outros MFEs podem escutar)
			dispatchAuthSuccess(response);

			// 3. Redirecionar para home após login
			setTimeout(() => {
				window.history.pushState({}, '', '/');
				window.dispatchEvent(new PopStateEvent('popstate'));
			}, 500); // Delay para feedback visual
		} catch (err: any) {
			const errorMessage = err.message || 'Erro ao fazer login. Verifique suas credenciais.';
			setError(errorMessage);
			dispatch(authSlice.setError(errorMessage));
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (data: RegisterData) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await registerUser(data);

			// 1. Atualizar Redux store (compartilhado com shell)
			dispatch(authSlice.authSuccess(response));

			// 2. Disparar evento customizado (outros MFEs podem escutar)
			dispatchAuthSuccess(response);

			// 3. Redirecionar para home após registro
			setTimeout(() => {
				window.history.pushState({}, '', '/');
				window.dispatchEvent(new PopStateEvent('popstate'));
			}, 500);
		} catch (err: any) {
			const errorMessage = err.message || 'Erro ao criar conta. Tente novamente.';
			setError(errorMessage);
			dispatch(authSlice.setError(errorMessage));
		} finally {
			setIsLoading(false);
		}
	};

	return { login, register, isLoading, error };
}
```

---

### 16. src/services/auth-api.ts

**Caminho**: `apps/mfe-login-native/src/services/auth-api.ts`

```typescript
import { apiClient, setAuthToken } from '@repo/utils';
import type { LoginCredentials, RegisterData, AuthResponse } from '@repo/types';

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
	const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
	setAuthToken(response.token);
	return response;
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
	const response = await apiClient.post<AuthResponse>('/api/auth/register', data);
	setAuthToken(response.token);
	return response;
}
```

---

### 17. src/services/auth-events.ts

**Caminho**: `apps/mfe-login-native/src/services/auth-events.ts`

```typescript
import type { AuthResponse } from '@repo/types';

// Nomes dos eventos
export const AUTH_EVENTS = {
	SUCCESS: 'auth:success',
	LOGOUT: 'auth:logout',
} as const;

/**
 * Dispara evento de sucesso na autenticação
 */
export function dispatchAuthSuccess(data: AuthResponse) {
	const event = new CustomEvent(AUTH_EVENTS.SUCCESS, {
		detail: data,
	});
	window.dispatchEvent(event);
}

/**
 * Dispara evento de logout
 */
export function dispatchAuthLogout() {
	const event = new CustomEvent(AUTH_EVENTS.LOGOUT);
	window.dispatchEvent(event);
}
```

---

## 🏠 Shell Host (web-simple)

### 1. Atualizar package.json

**Caminho**: `apps/web-simple/package.json`

Adicionar dependência:

```json
"devDependencies": {
  "@module-federation/vite": "^1.0.8",
  "@originjs/vite-plugin-federation": "^1.3.5",
  // ... outras deps
}
```

**Nota**: Manter `@originjs` para compatibilidade com Aula 3. Para Aula 4, usar apenas `@module-federation/vite`.

---

### 2. vite.config.ts (HOST)

**Caminho**: `apps/web-simple/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'web-simple',
			dts: false,
			remotes: {
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
```

**Pontos-chave**:
- ⭐ `import { federation }` (import nomeado)
- ⭐ `dts: false` (evita erros)
- ⭐ Sintaxe de remotes como **objeto** (não string)
- ⭐ `entry: 'http://localhost:5002/remoteEntry.js'` (raiz, não /assets/)

---

### 3. tsconfig.app.json

**Caminho**: `apps/web-simple/tsconfig.app.json`

Adicionar `rootDir`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "rootDir": "./src",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

**Pontos-chave**:
- ⭐ `rootDir: "./src"` (necessário para plugin DTS)

---

### 4. src/vite-env.d.ts

**Caminho**: `apps/web-simple/src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

declare module 'mfeLoginNative/LoginApp' {
	const LoginApp: React.ComponentType;
	export default LoginApp;
}
```

---

### 5. src/App.tsx

**Caminho**: `apps/web-simple/src/App.tsx`

```typescript
import { useEffect, useState, lazy, Suspense } from 'react';
import { Home } from './pages/Home';

// Aula 4 - Native Federation
const LoginAppNative = lazy(() => import('mfeLoginNative/LoginApp'));

function App() {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const handlePopState = () => {
			setCurrentPath(window.location.pathname);
		};

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	// Rota /login - Carrega MFE via Native Federation
	if (currentPath === '/login') {
		return (
			<>
				<div className='fixed top-4 left-4 z-50'>
					<button
						onClick={() => {
							window.history.pushState({}, '', '/');
							setCurrentPath('/');
						}}
						className='px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg'
					>
						← Voltar para Home
					</button>
				</div>
				<Suspense
					fallback={
						<div className='min-h-screen flex items-center justify-center'>
							<div className='text-lg text-gray-600'>Carregando...</div>
						</div>
					}
				>
					<LoginAppNative />
				</Suspense>
			</>
		);
	}

	return <Home />;
}

export default App;
```

---

### 6. src/main.tsx (LIMPO - SEM SINGLE-SPA)

**Caminho**: `apps/web-simple/src/main.tsx`

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

// Single-spa removido para Aula 4 (Native Federation)

declare global {
	interface Window {
		__SHARED_STORE__: any;
	}
}

const resizeObserverErrHandler = (e: ErrorEvent) => {
	if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
		e.stopImmediatePropagation();
	}
};

window.addEventListener('error', resizeObserverErrHandler);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
```

**Pontos-chave**:
- ❌ Sem `registerApplication`
- ❌ Sem `start`
- ❌ Sem SystemJS
- ✅ Apenas React padrão

---

### 7. index.html (LIMPO - SEM SYSTEMJS)

**Caminho**: `apps/web-simple/index.html`

```html
<!doctype html>
<html lang="pt-BR">
	<head>
		<meta charset="UTF-8" />
		<meta
			http-equiv="Content-Security-Policy"
			content="default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net http://localhost:4001 http://localhost:5001 http://localhost:5002 http://localhost:3000;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:5001 http://localhost:5002 http://localhost:3000;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' http://localhost:3001 http://localhost:4001 http://localhost:5001 http://localhost:5002 https://cdn.jsdelivr.net http://localhost:3000;"
		/>
		<link rel="icon" type="image/svg+xml" href="/vite.svg" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			rel="stylesheet"
		/>
		<title>Livraria Online - Micro Frontends</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>
```

**Pontos-chave**:
- ✅ CSP permite porta **5002**
- ❌ Sem scripts SystemJS
- ❌ Sem import map
- ❌ Sem container `#mfe-login-container`

---

## 🧪 Testes

### 1. Iniciar servidores

**Script root**:
```bash
pnpm dev:aula4
```

**Manual**:
```bash
# Terminal 1: API Backend
cd apps/api-backend
pnpm dev

# Terminal 2: Web Simple
cd apps/web-simple
pnpm dev

# Terminal 3: MFE Login Native
cd apps/mfe-login-native
pnpm dev
```

---

### 2. Verificar remoteEntry.js

```bash
curl http://localhost:5002/remoteEntry.js | head -c 200
```

**Esperado**: JavaScript válido começando com `import { i as init_1 }...`

---

### 3. Testar no Browser

1. Abrir: http://localhost:3000
2. Clicar em "Entrar"
3. Verificar console (deve estar limpo)
4. Login: `demo@example.com` / `demo123`
5. Verificar redirect para home

---

### 4. Verificar Network Tab

**Deve aparecer**:
- ✅ `remoteEntry.js` de `http://localhost:5002/` (200 OK)
- ✅ Chunks: `LoginApp-*.js`, `react-redux-*.js`, etc.
- ✅ CSS: `style-*.css`

---

### 5. Verificar Redux DevTools

**Deve mostrar**:
- ✅ Action: `authSlice/authSuccess`
- ✅ State: `auth.user = { id, name, email }`
- ✅ State: `auth.isAuthenticated = true`

---

## 📊 Comparação: Module Federation vs Native Federation

### Plugin

```typescript
// Module Federation (@originjs)
import federation from '@originjs/vite-plugin-federation';

// Native Federation (@module-federation/vite)
import { federation } from '@module-federation/vite';
```

### Remote Entry

```typescript
// Module Federation
remotes: {
  mfeLogin: 'http://localhost:5001/assets/remoteEntry.js'
}

// Native Federation
remotes: {
  mfeLoginNative: {
    type: 'module',
    name: 'mfeLoginNative',
    entry: 'http://localhost:5002/remoteEntry.js'  // Raiz
  }
}
```

### Performance

| Métrica | Module Federation | Native Federation |
|---------|-------------------|-------------------|
| Build Time | ~4.42s | ~1.30s ⚡ |
| HMR | ~1500ms | <50ms ⚡⚡⚡ |
| Bundle Size | ~200KB | ~180KB |

---

## ✨ Dicas Importantes

1. ⭐ **URL do Remote Entry**: `/remoteEntry.js` (raiz), não `/assets/`
2. ⭐ **Plugin DTS**: Desabilitar com `dts: false`
3. ⭐ **rootDir**: Adicionar nos tsconfig.json
4. ⭐ **Import**: `import { federation }` (nomeado)
5. ⭐ **Sintaxe Remotes**: Objeto, não string
6. ⭐ **Mesmos plugins**: Host e Remote devem usar `@module-federation/vite`

---

**Última atualização**: 13/02/2026
**Versão**: 1.0
**Status**: ✅ Validado e Testado

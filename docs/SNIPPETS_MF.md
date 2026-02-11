# Snippets de Código - Module Federation Login

Este arquivo contém todos os códigos prontos para copy/paste de Module Federation.

**Ordem de implementação**: MFE Remote → Shell Host → Testes

---

## 📦 MFE Remote (mfe-login-mf)

### 1. package.json

**Caminho**: `apps/mfe-login-mf/package.json`

```json
{
	"name": "mfe-login-mf",
	"private": true,
	"version": "1.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite build && vite preview --port 5001",
		"dev:standalone": "vite --port 5001",
		"build": "vite build",
		"preview": "vite preview"
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
		"@originjs/vite-plugin-federation": "^1.3.5",
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

---

### 2. vite.config.ts (REMOTE)

**Caminho**: `apps/mfe-login-mf/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'mfeLogin',
			filename: 'remoteEntry.js',
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
		port: 5001,
		cors: true,
	},
	preview: {
		port: 5001,
		cors: true,
	},
});
```

**Pontos-chave**:

- ⭐ `name: 'mfeLogin'` - Nome do remote
- ⭐ `exposes: { './LoginApp': './src/LoginApp' }` - O que exporta
- ⭐ `singleton: true` - Uma única instância de React/Redux
- ⭐ `cors: true` - Permite acesso do shell
- ⭐ `preview: { port: 5001 }` - Preview mode usa mesma porta

---

### 3. tsconfig.json

**Caminho**: `apps/mfe-login-mf/tsconfig.json`

```json
{
	"compilerOptions": {
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

---

### 4. tailwind.config.js

**Caminho**: `apps/mfe-login-mf/tailwind.config.js`

```javascript
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
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

### 5. postcss.config.js

**Caminho**: `apps/mfe-login-mf/postcss.config.js`

```javascript
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};
```

---

### 6. index.css

**Caminho**: `apps/mfe-login-mf/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 7. store.ts

**Caminho**: `apps/mfe-login-mf/src/store.ts`

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

### 8. LoginApp.tsx (COMPONENTE EXPOSTO)

**Caminho**: `apps/mfe-login-mf/src/LoginApp.tsx`

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md" padding="lg">
          <CardHeader>
            <CardTitle className="text-center">Bem-vindo ao LeiaAqui</CardTitle>
            <p className="text-sm text-gray-500 text-center mt-2">
              Faça login ou crie sua conta para continuar
            </p>
          </CardHeader>

          <CardContent>
            <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-6">
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

**Importante**: `export default` (Module Federation exige default export)

---

### 9. main.tsx (standalone)

**Caminho**: `apps/mfe-login-mf/src/main.tsx`

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
  </React.StrictMode>
);
```

---

### 10. index.html

**Caminho**: `apps/mfe-login-mf/index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>MFE Login - Module Federation</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>
```

---

## 📦 Serviços (Copy/Paste do Single-spa)

### 1. auth-api.ts

**Caminho**: `apps/mfe-login-mf/src/services/auth-api.ts`

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

### 2. auth-events.ts

**Caminho**: `apps/mfe-login-mf/src/services/auth-events.ts`

```typescript
import type { AuthResponse } from '@repo/types';

export const AUTH_EVENTS = {
	SUCCESS: 'auth:success',
	LOGOUT: 'auth:logout',
} as const;

export function dispatchAuthSuccess(data: AuthResponse) {
	const event = new CustomEvent(AUTH_EVENTS.SUCCESS, {
		detail: data,
	});
	window.dispatchEvent(event);
}

export function dispatchAuthLogout() {
	const event = new CustomEvent(AUTH_EVENTS.LOGOUT);
	window.dispatchEvent(event);
}
```

---

## 🪝 Hooks

### 1. useAuth.ts

**Caminho**: `apps/mfe-login-mf/src/hooks/useAuth.ts`

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

			// 1. Atualizar Redux store
			dispatch(authSlice.authSuccess(response));

			// 2. Disparar evento customizado
			dispatchAuthSuccess(response);

			// 3. Redirecionar para home
			setTimeout(() => {
				window.history.pushState({}, '', '/');
				window.dispatchEvent(new PopStateEvent('popstate'));
			}, 500);
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

			dispatch(authSlice.authSuccess(response));
			dispatchAuthSuccess(response);

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

## 🧩 Componentes

### 1. TabSwitcher.tsx

**Caminho**: `apps/mfe-login-mf/src/components/TabSwitcher.tsx`

```typescript
import React from 'react';

interface TabSwitcherProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b border-gray-200">
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

### 2. LoginForm.tsx

**Caminho**: `apps/mfe-login-mf/src/components/LoginForm.tsx`

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
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {apiError}
        </div>
      )}

      <FormField>
        <FormLabel required>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          error={errors.email}
        />
        <FormError>{errors.email}</FormError>
      </FormField>

      <FormField>
        <FormLabel required>Senha</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          error={errors.password}
        />
        <FormError>{errors.password}</FormError>
      </FormField>

      <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
        Entrar
      </Button>
    </Form>
  );
}
```

---

### 3. RegisterForm.tsx

**Caminho**: `apps/mfe-login-mf/src/components/RegisterForm.tsx`

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
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {apiError}
        </div>
      )}

      <FormField>
        <FormLabel required>Nome completo</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          error={errors.name}
        />
        <FormError>{errors.name}</FormError>
      </FormField>

      <FormField>
        <FormLabel required>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          error={errors.email}
        />
        <FormError>{errors.email}</FormError>
      </FormField>

      <FormField>
        <FormLabel required>Senha</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          error={errors.password}
        />
        <FormError>{errors.password}</FormError>
      </FormField>

      <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
        Criar conta
      </Button>

      <p className="text-sm text-gray-600 text-center mt-4">
        Já tem uma conta?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary-600 hover:underline"
        >
          Faça login
        </button>
      </p>
    </Form>
  );
}
```

---

## 🏠 Shell Host (web-simple)

### 1. vite.config.ts (HOST)

**Caminho**: `apps/web-simple/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

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
});
```

**⚠️ IMPORTANTE**: URL correta é `/assets/remoteEntry.js` após build. O plugin `@originjs/vite-plugin-federation` requer build + preview mode para funcionar corretamente.

---

### 2. vite-env.d.ts (TypeScript declarations)

**Caminho**: `apps/web-simple/src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

declare module 'mfeLogin/LoginApp' {
	const LoginApp: React.ComponentType;
	export default LoginApp;
}
```

---

### 3. App.tsx (Dynamic import com React.lazy)

**Caminho**: `apps/web-simple/src/App.tsx`

```typescript
import { useEffect, useState, lazy, Suspense } from 'react';
import { Home } from './pages/Home';

// Module Federation - Dynamic import
const LoginAppMF = lazy(() => import('mfeLogin/LoginApp'));

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Rota /login - Module Federation
  if (currentPath === '/login') {
    return (
      <>
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              setCurrentPath('/');
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
          >
            ← Voltar para Home
          </button>
        </div>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-lg text-gray-600">Carregando...</div>
            </div>
          }
        >
          <LoginAppMF />
        </Suspense>
      </>
    );
  }

  return <Home />;
}

export default App;
```

---

### 4. Home.tsx (navegação)

**Caminho**: `apps/web-simple/src/pages/Home.tsx`

Atualizar função de navegação:

```typescript
const handleLoginClick = () => {
	window.history.pushState({}, '', '/login');
	window.dispatchEvent(new PopStateEvent('popstate'));
};
```

Remover `handleAula3Click` (não é mais necessário).

---

### 5. Header.tsx (botão unificado)

**Caminho**: `apps/web-simple/src/components/Header.tsx`

Atualizar interface:

```typescript
interface HeaderProps {
	onLoginClick: () => void;
	onFavoritesClick: () => void;
	onProfileClick: () => void;
}

export function Header({ onLoginClick, onFavoritesClick, onProfileClick }: HeaderProps) {
	// ...resto do código
}
```

Atualizar botão de login (remover botão Aula 3):

```typescript
{!isAuthenticated && (
  <Button onClick={onLoginClick} variant="primary" size="sm">
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
    Entrar
  </Button>
)}
```

---

### 6. index.html (CSP - opcional)

**Caminho**: `apps/web-simple/index.html`

Atualizar Content-Security-Policy para incluir porta 5001:

```html
<meta
	http-equiv="Content-Security-Policy"
	content="default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net http://localhost:4001 http://localhost:5001;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' http://localhost:3001 http://localhost:4001 http://localhost:5001 https://cdn.jsdelivr.net;"
/>
```

---

## 🚀 Scripts de Inicialização

### Script root (package.json)

**Caminho**: `package.json` (root)

Adicionar script:

```json
{
	"scripts": {
		"dev:aula3": "turbo run dev --filter=web-simple --filter=mfe-login-mf --filter=api-backend --parallel"
	}
}
```

### Comandos manuais

```bash
# Terminal 1: Backend
cd apps/api-backend
pnpm dev

# Terminal 2: Shell
cd apps/web-simple
pnpm dev

# Terminal 3: MFE Login (Build + Preview)
cd apps/mfe-login-mf
pnpm dev  # Faz build E inicia preview na porta 5001
```

---

## 🐛 Troubleshooting - Snippets de Debug

### Verificar remoteEntry.js carregado

```javascript
// No console do browser
fetch('http://localhost:5001/assets/remoteEntry.js')
	.then((r) => r.text())
	.then(console.log)
	.catch(console.error);
```

### Verificar shared modules

```javascript
// No console do browser (após carregar MFE)
console.log(window.__federation_shared__);
```

### Forçar reload do remote

```typescript
// Adicionar cache bust
const LoginAppMF = lazy(() => import('mfeLogin/LoginApp?t=' + Date.now()));
```

### Verificar store compartilhado

```javascript
// No console do browser
console.log(window.__SHARED_STORE__);
console.log(window.__SHARED_STORE__.getState());
```

---

## ✅ Checklist de Implementação

### MFE Remote (mfe-login-mf)

```bash
# 1. Criar estrutura
mkdir -p apps/mfe-login-mf/src/{components,hooks,services}

# 2. Copiar arquivos de config
# - package.json
# - vite.config.ts
# - tsconfig.json
# - tailwind.config.js
# - postcss.config.js

# 3. Copiar código fonte
# - src/index.css
# - src/store.ts
# - src/LoginApp.tsx (default export!)
# - src/main.tsx
# - index.html

# 4. Copiar lógica de negócio
# - src/services/auth-api.ts
# - src/services/auth-events.ts
# - src/hooks/useAuth.ts
# - src/components/TabSwitcher.tsx
# - src/components/LoginForm.tsx
# - src/components/RegisterForm.tsx

# 5. Instalar e rodar
cd apps/mfe-login-mf
pnpm install
pnpm dev
```

### Shell Host (web-simple)

```bash
# 1. Instalar plugin
cd apps/web-simple
pnpm add -D @originjs/vite-plugin-federation

# 2. Atualizar arquivos
# - vite.config.ts (adicionar federation plugin)
# - src/vite-env.d.ts (declarações de tipo)
# - src/App.tsx (lazy import + Suspense)
# - src/pages/Home.tsx (remover handleAula3Click)
# - src/components/Header.tsx (simplificar botões)
# - index.html (CSP - opcional)

# 3. Rodar
pnpm dev
```

# Snippets de Código - Single-spa Login

Este arquivo contém todos os códigos prontos para copy/paste durante a gravação do curso.

**Ordem de implementação**: Serviços → Hooks → Componentes

---

## Serviços

### 1. auth-api.ts

**Caminho**: `apps/mfe-login-singlespa/src/services/auth-api.ts`

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

**Caminho**: `apps/mfe-login-singlespa/src/services/auth-events.ts`

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

## Hooks

### 1. useAuth.ts

**Caminho**: `apps/mfe-login-singlespa/src/hooks/useAuth.ts`

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

1. **Chamar API** (`loginUser` ou `registerUser`)
2. **Atualizar Redux** (`dispatch(authSlice.authSuccess)`) → Store compartilhado entre shell e MFE
3. **Disparar evento** (`dispatchAuthSuccess`) → Outros MFEs podem escutar para mostrar notificações
4. **Redirecionar** (`window.history.pushState`) → Volta para home
5. **Tratamento de erros** → Feedback visual com mensagem de erro

---

## Componentes

### 1. TabSwitcher.tsx

**Caminho**: `apps/mfe-login-singlespa/src/components/TabSwitcher.tsx`

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

**Caminho**: `apps/mfe-login-singlespa/src/components/LoginForm.tsx`

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

**Caminho**: `apps/mfe-login-singlespa/src/components/RegisterForm.tsx`

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

## 📦 Arquivos de Configuração (Referência)

### webpack.config.cjs

**Caminho**: `apps/mfe-login-singlespa/webpack.config.cjs`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
	entry: './src/index.tsx',
	output: {
		filename: 'mfe-login.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: argv.mode === 'production' ? '/mfe-login/' : 'http://localhost:4001/',
		libraryTarget: 'system',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
	externals: ['react', 'react-dom'],
	devServer: {
		port: 4001,
		headers: { 'Access-Control-Allow-Origin': '*' },
		hot: false,
	},
});
```

---

### tailwind.config.cjs

**Caminho**: `apps/mfe-login-singlespa/tailwind.config.cjs`

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

### postcss.config.cjs

**Caminho**: `apps/mfe-login-singlespa/postcss.config.cjs`

```javascript
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};
```

---

### tsconfig.json

**Caminho**: `apps/mfe-login-singlespa/tsconfig.json`

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

### package.json

**Caminho**: `apps/mfe-login-singlespa/package.json`

```json
{
	"name": "mfe-login-singlespa",
	"private": true,
	"version": "1.0.0",
	"type": "module",
	"scripts": {
		"dev": "webpack serve --mode development --config webpack.config.cjs",
		"build": "webpack --mode production --config webpack.config.cjs",
		"type-check": "tsc --noEmit"
	},
	"dependencies": {
		"react": "^18.2.0",
		"react-dom": "^18.2.0",
		"react-redux": "^9.0.0",
		"single-spa": "^6.0.0",
		"single-spa-react": "^6.0.0",
		"@repo/ui": "workspace:*",
		"@repo/store": "workspace:*",
		"@repo/types": "workspace:*",
		"@repo/utils": "workspace:*"
	},
	"devDependencies": {
		"@types/react": "^18.2.0",
		"@types/react-dom": "^18.2.0",
		"@types/systemjs": "^6.13.5",
		"typescript": "^5.3.0",
		"webpack": "^5.89.0",
		"webpack-cli": "^5.1.4",
		"webpack-dev-server": "^4.15.1",
		"html-webpack-plugin": "^5.5.4",
		"ts-loader": "^9.5.1",
		"style-loader": "^3.3.3",
		"css-loader": "^6.8.1",
		"postcss-loader": "^7.3.4",
		"tailwindcss": "^3.4.0",
		"autoprefixer": "^10.4.16"
	}
}
```

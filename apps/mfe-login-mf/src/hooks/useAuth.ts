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

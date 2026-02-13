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

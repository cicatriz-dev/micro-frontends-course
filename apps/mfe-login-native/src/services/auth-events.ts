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

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

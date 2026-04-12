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

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui';
import { LoginForm } from './components/LoginForm';

type Tab = 'login' | 'register';

export function LoginApp() {
	const [activeTab, setActiveTab] = useState<Tab>('login');

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<Card className='w-full max-w-md' padding='lg'>
				<CardHeader>
					<CardTitle className='text-center'>Bem-vindo ao LeiaAqui</CardTitle>
					<p className='text-sm text-gray-500 text-center mt-2'>
						Faça login ou crie sua conta para continuar
					</p>
				</CardHeader>

				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}

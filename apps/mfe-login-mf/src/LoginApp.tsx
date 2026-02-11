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

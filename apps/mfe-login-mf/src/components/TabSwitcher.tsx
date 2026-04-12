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

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

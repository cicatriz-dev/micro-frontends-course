import { createSharedStore } from '@repo/store';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@repo/store';

// Create store instance
export const store = createSharedStore();

(window as any).__SHARED_STORE__ = store;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

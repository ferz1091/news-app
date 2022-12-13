// Core
import { useSelector, TypedUseSelectorHook } from 'react-redux';

// Types
import type { RootState } from '../../init/redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

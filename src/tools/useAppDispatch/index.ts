// Core
import { useDispatch } from 'react-redux';

// Types
import type { AppDispatch } from '../../init/redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

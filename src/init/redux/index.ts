// Core
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

// Reducers
import general from '../../bus/general/slice';

const isDev = process.env.NODE_ENV === 'development';

const logger = createLogger({
    duration: true,
    collapsed: true,
    colors: {
        title: () => '#808080',
        prevState: () => '#0000FF',
        action: () => '#00FF00',
        nextState: () => '#800080',
        error: () => '#FF0000',
    },
});

export const store = configureStore({
    reducer: {
        general
    },
    middleware: (getDefaultMiddleWare) => isDev ? getDefaultMiddleWare().concat(logger) : getDefaultMiddleWare()
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

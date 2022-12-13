// Core
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'

// Bus
import { store } from '../init/redux';

// Pages
import { MainPage } from './pages';

// Components
import { Navigation } from './components';

export const App: React.FC = () => {
    return (
        <div className="App" id='app'>
            <Provider store={store}>
                <BrowserRouter>
                <Navigation />
                    <Routes>
                        <Route
                            path='/'
                            element={<MainPage />}
                        />
                        <Route 
                            path='*'
                            element={<Navigate replace to='/' />}
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

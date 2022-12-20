// Core
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

// Bus
import { store } from '../init/redux';

// Routes
import { Router } from './routes'; 

export const App: React.FC = () => {
    return (
        <div className="App" id='app'>
            <Provider store={store}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

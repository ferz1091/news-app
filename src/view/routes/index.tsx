// Core
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../tools';

// Pages
import { NewsByCountryPage, NewsByParamsPage } from '../pages';

// Components
import { LinearProgressSpinner, Navigation, HandleErrors } from '../components';

const PageLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/country')
        }
    }, [])
    return (
        <>
            <Navigation />
            <HandleErrors />
            <Outlet />
        </>
    )
}

export const Router: React.FC = () => {
    const {country} = useAppSelector(state => state.general);
    return (
        <Routes>
            <Route 
                path='/'
                element={<PageLayout />}
            >
                <Route
                    path='/country/:code'
                    element={<NewsByCountryPage />}
                />
                <Route 
                    path='/news/:category/:query'
                    element={<NewsByParamsPage />}
                />
                <Route 
                    path={'/news'}
                    element={<LinearProgressSpinner isCountryCodeSet={!!country} />}
                />
                <Route 
                    path='/country'
                    element={<LinearProgressSpinner isCountryCodeSet={!!country} />}
                />
                <Route
                    path='*'
                    element={<Navigate replace to='/country' />}
                />
            </Route>
        </Routes>
    )
}

// Core
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Snackbar, Alert, Slide } from '@mui/material';

// Tools
import { useAppSelector } from '../../../tools';

export const HandleErrors: React.FC = () => {
    const {errors} = useAppSelector(state => state.general);
    const location = useLocation();
    const [hasError, setHasError] = useState<boolean>(false);
    useEffect(() => {
        if (errors.some(error => error.status)) {
            setHasError(true);
        } else {
            setHasError(false)
        }
    }, [errors])
    return (
        <Snackbar 
            open={hasError && location.pathname.includes('/country/') ? !!errors.find(error => error.id === 'country')?.status : location.pathname.includes('/news/') ? !!errors.find(error => error.id === 'params')?.status : location.pathname.includes('/country') ? !!errors.find(error => error.id === 'code')?.status : false} 
            disableWindowBlurListener={true}
            autoHideDuration={7000}
            onClose={() => setHasError(false)} 
            TransitionComponent={Slide}
        >
            <Alert severity='error' sx={{fontWeight: '600', bgcolor: 'rgba(255, 0, 0, 0.15)'}}>
                {location.pathname.includes('/country/') ? errors.find(error => error.id === 'country')?.message : location.pathname.includes('/news/') ? errors.find(error => error.id === 'params')?.message : ''}
                {location.pathname.includes('/country') ? errors.find(error => error.id === 'code')?.message : ''}
                {', try to reload the page'}
            </Alert>
        </Snackbar>
    )
}

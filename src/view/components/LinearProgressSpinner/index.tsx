// Core
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

// Bus
import { useGeneral } from '../../../bus/general';

export const LinearProgressSpinner: React.FC<{isCountryCodeSet?: boolean}> = ({isCountryCodeSet}) => {
    const {getUserCountryCode} = useGeneral();
    const params = useParams<{code?: string, category?: string, query?: string}>();
    const navigate = useNavigate();
    useEffect(() => {
        if (!params.code || !isCountryCodeSet) {
            getUserCountryCode((country: string) => navigate(`/country/${country}`));
        }
    }, [])
    return (
        <LinearProgress
            sx={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                width: '100vw',
                height: '10px'
            }}
        />
    )
}

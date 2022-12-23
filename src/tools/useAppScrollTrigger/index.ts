// Core
import { useState } from 'react';
import { useScrollTrigger } from '@mui/material';

export const useAppScrollTrigger = () => {
    const [scrollTarget, setScrollTarget] = useState<undefined | HTMLDivElement>(undefined);
    const trigger = useScrollTrigger({
        target: scrollTarget,
        disableHysteresis: true
    });
    return {
        scrollTarget,
        setScrollTarget,
        trigger
    }
}

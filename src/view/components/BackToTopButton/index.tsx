// Core
import React from 'react';
import { Fade, Box, Fab } from '@mui/material';

// Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const BackToTopButton: React.FC<{trigger: boolean}> = ({trigger}) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = document.querySelector('#cardAnchor');
        if (anchor) {
            anchor.scrollIntoView({
                block: 'center'
            });
        }
    };
    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 20, right: 20 }}
            >
                <Fab size='small' color='primary'>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Fade>
    );
}

// Core
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { teal } from '@mui/material/colors';

// Bus
import { store } from '../init/redux';

// Routes
import { Router } from './routes';

// Components
import { BackToTopButton } from './components';

// Tools
import { useAppScrollTrigger } from '../tools';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true; 
        sm: true;
        bsm: true;
        md: true;
        lg: true;
        xl: true;
    }
}

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: {
            main: '#fff'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            bsm: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

export const App: React.FC = () => {
    const {setScrollTarget, trigger} = useAppScrollTrigger();
    return (
        <ThemeProvider theme={theme}>
            <div className="App" id='app' ref={node => {
                if (node) {
                    setScrollTarget(node);
                }
            }}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </Provider>
                <BackToTopButton trigger={trigger}/>
            </div>
        </ThemeProvider>
    );
}

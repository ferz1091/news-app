// Core
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { LinearProgress, IconButton } from '@mui/material';

// Api
import NewsAPI from '../../../api';

// Bus
import { useGeneral } from '../../../bus/general';

// Components
import { NewsCard, SearchPanel } from '../../components';

// Tools
import { useAppSelector } from '../../../tools';

// Icons
import SettingsIcon from '@mui/icons-material/Settings';

export const MainPage: React.FC = () => {
    const {country, mainNews, currentTotalResults, isFetching} = useAppSelector(state => state.general);
    const { getTopHeadlinesByCountryCode, setHeadlines, setMainNewsPage, getUserCountryCode} = useGeneral();
    const [isLocalFetching, setLocalFetching] = useState<boolean>(false);
    const [sidePanelIsVisible, toggleSidePanelIsVisible] = useState<boolean>(false);
    const scrollHandler = (e: any): void => {
            if (e.target.scrollHeight - e.target.scrollTop - window.innerHeight < 100) {
                setLocalFetching(true);
            }
        }
    useEffect(() => {
        if (isLocalFetching) {
            if (mainNews.data.length && mainNews.data.length < currentTotalResults) {
                NewsAPI.getTopHeadlinesByCountryCode(country ? country : 'us', mainNews.page + 1)
                    .then(response => {
                        setHeadlines(response.data.articles);
                        setMainNewsPage(mainNews.page + 1);
                    })
                    .finally(() => setLocalFetching(false))
            } else {
                setLocalFetching(false);
            }
        }
    }, [isLocalFetching])
    useEffect(() => {
        document.getElementById('app')?.addEventListener('scroll', scrollHandler)
        return function () {
            document.getElementById('app')?.removeEventListener('scroll', scrollHandler)
        }
    }, [])
    useEffect(() => {
        if (mainNews.data.length < 20 * mainNews.page - 1)
        if (!country) {
            getUserCountryCode();
        } else {
            getTopHeadlinesByCountryCode(country, mainNews.page);
        }
    }, [country])
    return (
        <Container
            id='main'
            component='main'
            sx={{
                mt: '74px', 
                width: {
                    xl: '50%', 
                    lg: '60%', 
                    md: '70%', 
                    sm: '80%'
                },
                height: 'calc(100vh - 74px)'
            }}
        >
            <IconButton onClick={() => toggleSidePanelIsVisible(true)} sx={{ position: 'fixed', top: '64px', left: '0px'}}>
                <SettingsIcon fontSize='medium'/>
            </IconButton>
            {isFetching || isLocalFetching && mainNews.data.length < currentTotalResults ? 
                <LinearProgress 
                    sx={{ 
                        position: 'fixed', 
                        bottom: '0', 
                        left: '0', 
                        width: '100vw', 
                        height: '10px' 
                    }} 
                /> 
                : 
                null
            }
            {mainNews.data.length ? 
                mainNews.data.map(card => <NewsCard key={card.title} {...card} />)
                :
                null
            }
            <SearchPanel sidePanelIsVisible={sidePanelIsVisible} toggleSidePanelIsVisible={toggleSidePanelIsVisible} />
        </Container>
    )
}

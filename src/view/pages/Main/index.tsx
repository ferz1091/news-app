// Core
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { LinearProgress } from '@mui/material';

// Api
import NewsAPI from '../../../api';

// Bus
import { useGeneral } from '../../../bus/general';

// Components
import { NewsCard } from '../../components';

// Tools
import { useAppSelector } from '../../../tools';

export const MainPage: React.FC = () => {
    const {country, mainNews, currentTotalResults, isFetching} = useAppSelector(state => state.general);
    const {getTopHeadlinesByCountryCode, setHeadlines} = useGeneral();
    const [page, setPage] = useState(1);
    const [isLocalFetching, setLocalFetching] = useState(false);
    const scrollHandler = (e: any): void => {
            if (e.target.scrollHeight - e.target.scrollTop - window.innerHeight < 100) {
                setLocalFetching(true);
            }
        }
    useEffect(() => {
        if (isLocalFetching) {
            if (mainNews.length < currentTotalResults) {
                NewsAPI.getTopHeadlinesByCountryCode(country ? country : 'us', page + 1)
                    .then(response => {
                        setHeadlines(response.data.articles);
                        setPage(prevState => prevState + 1);
                    })
                    .finally(() => setLocalFetching(false))
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
        if (mainNews.length < 20 * page - 1)
        getTopHeadlinesByCountryCode(country, page);
    }, [])

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
            {isFetching || isLocalFetching && mainNews.length < currentTotalResults ? 
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
            {mainNews.length ? 
                mainNews.map(card => <NewsCard key={card.title} {...card} />)
                :
                null
            }
        </Container>
    )
}

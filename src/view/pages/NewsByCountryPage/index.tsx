// Core
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { LinearProgress } from '@mui/material';

// Bus
import { useGeneral } from '../../../bus/general';

// Components
import { NewsCard } from '../../components';

// Constants
import { regions } from '../../../init/constants';

// Tools
import { useAppSelector, useCountryPageScrollPagination } from '../../../tools';

export const NewsByCountryPage: React.FC = () => {
    const {country, mainNews, isFetching, cachedNews} = useAppSelector(state => state.general);
    const {getTopHeadlinesByCountryCode, getUserCountryCode, setCachedNews, cacheNews, resetMainNews} = useGeneral();
    const { isLocalFetching, params } = useCountryPageScrollPagination();
    const navigate = useNavigate();
    useEffect(() => {
        if (!regions.some(region => region.code === params.code)) {
            if (!country) {
                getUserCountryCode((country: string) => navigate(`/country/${country}`));
            } else {
                navigate(`/country/${country}`)
            }
        } else {
            if (!country) {
                getUserCountryCode()
            }
        }
    }, [])
    useEffect(() => {
        if (!mainNews.data.length) {
            if (cachedNews.some(news => news.country === params.code && !news.searchCategory)) {
                setCachedNews(cachedNews.find(news => news.country === params.code && !news.searchCategory))
            } else {
                getTopHeadlinesByCountryCode(params.code? params.code : 'us', mainNews.page);
            }
        } else {
            cacheNews(true);
            resetMainNews();
            if (cachedNews.some(news => news.country === params.code)) {
                setCachedNews(cachedNews.find(news => news.country === params.code))
            } else {
                getTopHeadlinesByCountryCode(params.code ? params.code : 'us', mainNews.page);
            }
        }
    }, [params.code])

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
            {isFetching || isLocalFetching && mainNews.data.length < mainNews.totalResults ? 
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
                mainNews.data.map((card, index) => <NewsCard key={card.title} cardData={card} index={index} />)
                :
                null
            }
        </Container>
    )
}

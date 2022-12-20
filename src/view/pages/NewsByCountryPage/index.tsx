// Core
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { LinearProgress } from '@mui/material';

// Api
import NewsAPI from '../../../api';

// Bus
import { useGeneral } from '../../../bus/general';

// Components
import { NewsCard } from '../../components';

// Constants
import { regions } from '../../../init/constants';

// Tools
import { useAppSelector } from '../../../tools';

export const NewsByCountryPage: React.FC = () => {
    const {country, mainNews, isFetching, cachedNews} = useAppSelector(state => state.general);
    const { getTopHeadlinesByCountryCode, setHeadlines, setMainNewsPage, getUserCountryCode, setCachedNews} = useGeneral();
    const [isLocalFetching, setLocalFetching] = useState<boolean>(false);
    const params = useParams<{code?: string}>();
    const navigate = useNavigate();
    const scrollHandler = (e: any): void => {
            if (e.target.scrollHeight - e.target.scrollTop - window.innerHeight < 100) {
                setLocalFetching(true);
            }
        }
    useEffect(() => {
        if (isLocalFetching) {
            if (mainNews.data.length && mainNews.data.length < mainNews.totalResults) {
                NewsAPI.getTopHeadlinesByCountryCode(params.code ? params.code : 'us', mainNews.page + 1)
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
        if (!regions.some(region => region.code === params.code)) {
            if (!country) {
                console.log(1);
                getUserCountryCode((country: string) => navigate(`/country/${country}`));
            } else {
                navigate(`/country/${country}`)
            }
        } else {
            if (!country) {
                console.log(2);
                getUserCountryCode()
            }
        }
    }, [])
    useEffect(() => {
        if (!mainNews.data.length) {
            if (cachedNews.some(news => news.country === params.code)) {
                setCachedNews(cachedNews.find(news => news.country === params.code))
            } else {
                getTopHeadlinesByCountryCode(params.code? params.code : 'us', mainNews.page);
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
                mainNews.data.map(card => <NewsCard key={card.title} {...card} />)
                :
                null
            }
        </Container>
    )
}

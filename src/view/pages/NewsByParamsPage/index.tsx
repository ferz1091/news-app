// Core
import React, { useState, useEffect } from 'react';
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

export const NewsByParamsPage: React.FC = () => {
    const {mainNews, cachedNews, country, isFetching} = useAppSelector(state => state.general);
    const {setHeadlines, setMainNewsPage, setCachedNews, getNewsByParams, getUserCountryCode, cacheNews, resetMainNews} = useGeneral();
    const [isLocalFetching, setLocalFetching] = useState<boolean>(false);
    const params = useParams<{category?: string, query?: string}>();
    const navigate = useNavigate();
    const scrollHandler = (e: any): void => {
        if (e.target.scrollHeight - e.target.scrollTop - window.innerHeight < 100) {
            setLocalFetching(true);
        }
    }
    useEffect(() => {
        document.getElementById('app')?.addEventListener('scroll', scrollHandler)
        return function () {
            document.getElementById('app')?.removeEventListener('scroll', scrollHandler)
        }
    }, [])
    useEffect(() => {
        if (isLocalFetching) {
            if (mainNews.data.length && mainNews.data.length < mainNews.totalResults) {
                if (params.category && params.category !== 'category') {
                    NewsAPI.getTopHeadlinesByCategory(params.category.slice(-2), mainNews.page + 1, params.category.slice(0, -3))
                        .then(response => {
                            setHeadlines(response.data.articles);
                            setMainNewsPage(mainNews.page + 1);
                        })
                        .finally(() => setLocalFetching(false))
                } else if (params.query && params.query !== 'query') {
                    NewsAPI.getNewsByString(params.query, mainNews.page + 1)
                        .then(response => {
                            setHeadlines(response.data.articles);
                            setMainNewsPage(mainNews.page + 1);
                        })
                        .finally(() => setLocalFetching(false))
                }
            } else {
                setLocalFetching(false);
            }
        }
    }, [isLocalFetching])
    useEffect(() => {
        if (!mainNews.data.length) {
            if (params.category && params.category !== 'category') {
                if (cachedNews.some(news => news.searchCategory === params.category?.slice(0, -3) && news.country === params.category.slice(-2))) {
                    setCachedNews(cachedNews.find(news => news.searchCategory === params.category?.slice(0, -3) && news.country === params.category?.slice(-2)))
                } else {
                    if (regions.some(region => region.code === params.category?.slice(-2))) {
                        getNewsByParams('', params.category.slice(0, -3), params.category?.slice(-2), mainNews.page)
                    } else {
                        if (!country) {
                            getUserCountryCode((country: string) => navigate(`/country/${country}`));
                        } else {
                            navigate(`/country/${country}`)
                        }
                    }
                }
            } else if (params.query && params.query !== 'query') {
                if (cachedNews.some(news => news.searchString === params.query)) {
                    setCachedNews(cachedNews.find(news => news.searchString === params.query))
                } else {
                    getNewsByParams(params.query, '', '', mainNews.page);
                }
            }
        } else {
            cacheNews(!mainNews.searchString);
            resetMainNews();
            if (params.category && params.category !== 'category') {
                if (cachedNews.some(news => news.searchCategory === params.category?.slice(0, -3) && news.country === params.category.slice(-2))) {
                    setCachedNews(cachedNews.find(news => news.searchCategory === params.category?.slice(0, -3) && news.country === params.category?.slice(-2)))
                } else {
                    if (regions.some(region => region.code === params.category?.slice(-2))) {
                        getNewsByParams('', params.category.slice(0, -3), params.category?.slice(-2), mainNews.page)
                    } else {
                        if (!country) {
                            getUserCountryCode((country: string) => navigate(`/country/${country}`));
                        } else {
                            navigate(`/country/${country}`)
                        }
                    }
                }
            } else if (params.query && params.query !== 'query') {
                if (cachedNews.some(news => news.searchString === params.query)) {
                    setCachedNews(cachedNews.find(news => news.searchString === params.query))
                } else {
                    getNewsByParams(params.query, '', '', mainNews.page);
                }
            }
        }
    }, [params.category, params.query])
    useEffect(() => {
        if (!country) {
            getUserCountryCode()
        }
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

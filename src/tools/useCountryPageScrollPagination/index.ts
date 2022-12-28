// Core
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Api
import NewsAPI from '../../api';

// Bus
import { useGeneral } from '../../bus/general';

// Tools
import { useAppSelector } from '../useAppSelector';

export const useCountryPageScrollPagination = () => {
    const {mainNews} = useAppSelector(state => state.general);
    const {setHeadlines, setMainNewsPage} = useGeneral();
    const [isLocalFetching, setLocalFetching] = useState<boolean>(false);
    const params = useParams<{code?: string}>();
    const scrollHandler = (e: any): void => {
        if (e.target.scrollHeight - e.target.scrollTop - window.innerHeight < 100) {
            setLocalFetching(true);
        }
    }
    useEffect(() => {
        if (isLocalFetching) {
            if (mainNews.data.length && mainNews.data.length < mainNews.totalResults && mainNews.data.length <= 99) {
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
    return {
        isLocalFetching,
        params
    }
}

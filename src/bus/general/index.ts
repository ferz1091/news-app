// Tools
import { useAppDispatch } from '../../tools';

// Actions
import { generalActions } from './slice';

// Thunks
import * as thunks from './thunks';

// Types
import { HeadlineType, MainNewsType} from '../../init/types/defaultTypes';

export const useGeneral = () => {
    const dispatch = useAppDispatch();
    function getUserCountryCode(func?: (country: string) => void) {
        dispatch(thunks.getUserCountryCodeThunk({func}))
    }
    function getTopHeadlinesByCountryCode(countryCode: string, page: number) {
        dispatch(thunks.getTopHeadlinesByCountryCodeThunk({countryCode, page}))
    }
    function getNewsByParams(searchString: string, searchCategory: string, countryCode: string, page: number) {
        dispatch(thunks.getNewsByParamsThunk({searchString, searchCategory, countryCode, page}))
    }
    function setHeadlines(articles: HeadlineType[]) {
        dispatch(generalActions.setHeadlines(articles))
    }
    function setMainNewsPage(page: number) {
        dispatch(generalActions.setMainNewsPage(page))
    }
    function resetMainNews() {
        dispatch(generalActions.resetMainNews())
    }
    function setCountryCode(countryCode: string) {
        dispatch(generalActions.setCountryCode(countryCode))
    }
    function cacheNews(byCode: boolean) {
        dispatch(generalActions.cacheNews({byCode}))
    }
    function setCachedNews(news: MainNewsType | undefined) {
        dispatch(generalActions.setCachedNews(news))
    }
    return {
        getUserCountryCode,
        getTopHeadlinesByCountryCode,
        getNewsByParams,
        setHeadlines,
        resetMainNews,
        setCountryCode,
        setMainNewsPage,
        cacheNews,
        setCachedNews
    }
}

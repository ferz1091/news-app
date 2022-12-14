// Tools
import { useAppDispatch } from '../../tools';

// Actions
import { generalActions } from './slice';

// Thunks
import * as thunks from './thunks';

// Types
import { HeadlineType } from '../../init/types/defaultTypes';
type useGeneralType = () => {
    getUserCountryCode: () => void;
    getTopHeadlinesByCountryCode: (countryCode: string | null, page: number) => void;
    setHeadlines: (articles: HeadlineType[]) => void;
    resetMainNews: () => void;
    setCountryCode: (countryCode: string) => void;
    setMainNewsPage: (page: number) => void;
}

export const useGeneral: useGeneralType = () => {
    const dispatch = useAppDispatch();
    function getUserCountryCode() {
        dispatch(thunks.getUserCountryCodeThunk())
    }
    function getTopHeadlinesByCountryCode(countryCode: null | string, page: number) {
        dispatch(thunks.getTopHeadlinesByCountryCodeThunk({countryCode, page}))
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
    return {
        getUserCountryCode,
        getTopHeadlinesByCountryCode,
        setHeadlines,
        resetMainNews,
        setCountryCode,
        setMainNewsPage
    }
}

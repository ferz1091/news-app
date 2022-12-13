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
    return {
        getUserCountryCode,
        getTopHeadlinesByCountryCode,
        setHeadlines
    }
}

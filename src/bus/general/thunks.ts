// Core
import { createAsyncThunk } from '@reduxjs/toolkit';

// Init
import { regions } from '../../init/constants';

// Actions
import { generalActions } from './slice';

// Api
import NewsAPI from '../../api';

// Types
import type { CountryCodeData, TopHeadlinesByCountryCodeType } from '../../init/types/defaultTypes';

// GET USERS COUNTRY CODE
export const getUserCountryCodeThunk = createAsyncThunk<CountryCodeData, void>('general/getUserCountryCode', async() => {
    const response = await NewsAPI.getUserCountryCode();
    return response.data;
})

// GET HEADLINES BY COUNTRY CODE
export const getTopHeadlinesByCountryCodeThunk = createAsyncThunk<TopHeadlinesByCountryCodeType, { countryCode: string | null, page: number}>('general/getTopHeadlinesByCountryCode', async({countryCode, page}, {dispatch}) => {
    if (!countryCode) {
        const response = await NewsAPI.getUserCountryCode();
        if (regions.some(region => region === response.data.country_code.toLocaleLowerCase())){
            dispatch(generalActions.setCountryCode(response.data.country_code.toLocaleLowerCase()));
        } else {
            dispatch(generalActions.setCountryCode('us'))
        }
        const headlines: { data: TopHeadlinesByCountryCodeType } = await NewsAPI.getTopHeadlinesByCountryCode(response.data.country_code, page);
        if (page === 1) {
            dispatch(generalActions.setCurrentTotalResults(headlines.data.totalResults));
        } 
        return headlines.data;
    } else {
        const headlines = await NewsAPI.getTopHeadlinesByCountryCode(countryCode, page);
        if (page === 1) {
            dispatch(generalActions.setCurrentTotalResults(headlines.data.totalResults));
        } 
        return headlines.data;
    }
})

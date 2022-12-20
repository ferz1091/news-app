// Core
import { createAsyncThunk } from '@reduxjs/toolkit';

// Api
import NewsAPI from '../../api';

// Types
import type { CountryCodeData, TopHeadlinesByCountryCodeType } from '../../init/types/defaultTypes';

// GET USERS COUNTRY CODE
export const getUserCountryCodeThunk = createAsyncThunk<CountryCodeData, {func?: (country: string) => void}>('general/getUserCountryCode', async({func}) => {
    const response = await NewsAPI.getUserCountryCode();
    return response.data;
})

// GET HEADLINES BY COUNTRY CODE
export const getTopHeadlinesByCountryCodeThunk = createAsyncThunk<TopHeadlinesByCountryCodeType, {countryCode: string, page: number}>('general/getTopHeadlinesByCountryCode', async({countryCode, page}) => {
    const headlines = await NewsAPI.getTopHeadlinesByCountryCode(countryCode, page);
    return headlines.data;
})

// GET NEWS BY PARAMS
export const getNewsByParamsThunk = createAsyncThunk<TopHeadlinesByCountryCodeType, {searchString: string, searchCategory: string, countryCode: string, page: number}>('general/getNewsByParams', async({searchString, searchCategory, countryCode, page}, {dispatch}) => {
    if (searchString) {
        const response = await NewsAPI.getNewsByString(searchString, page);
        return response.data;
    } else {
        const response = await NewsAPI.getTopHeadlinesByCategory(countryCode, page, searchCategory);
        return response.data;
    }
})

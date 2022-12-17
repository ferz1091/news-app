// Core
import { createSlice } from '@reduxjs/toolkit';

// Thunks
import * as thunks from './thunks';

// Constants
import { regions } from '../../init/constants';

// Type
import { PayloadAction } from '@reduxjs/toolkit';
import { HeadlineType, CachedNewsType } from '../../init/types/defaultTypes';

export type generalState = {
    country: string | null,
    mainNews: {data:Array<HeadlineType>, page: number},
    currentTotalResults: number,
    cachedNews: Array<CachedNewsType>
    isFetching: boolean,
    error: string | undefined
};

const initialState: generalState = {
    country: null,
    mainNews: {data:[], page: 1},
    currentTotalResults: 0,
    cachedNews: [],
    isFetching: false,
    error: undefined
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        // SET COUNTRY CODE
        setCountryCode: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
        },
        // SET TOTAL RESULTS
        setCurrentTotalResults: (state, action: PayloadAction<number>) => {
            state.currentTotalResults = action.payload;
        },
        // SET HEADLINES
        setHeadlines: (state, action: PayloadAction<HeadlineType[]>) => {
            state.mainNews.data = state.mainNews.data.concat(action.payload)
        },
        // SET MAIN NEWS PAGE
        setMainNewsPage: (state, action: PayloadAction<number>) => {
            state.mainNews.page = action.payload
        },
        // RESET MAIN NEWS
        resetMainNews: (state) => {
            state.mainNews.data = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(thunks.getUserCountryCodeThunk.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(thunks.getUserCountryCodeThunk.fulfilled, (state, action) => {
            state.country = regions.some(region => region.code === action.payload.country_code.toLocaleLowerCase()) ? action.payload.country_code.toLowerCase() : 'us';
            state.isFetching = false;
        })
        .addCase(thunks.getUserCountryCodeThunk.rejected, (state, action) => {
            state.error = action.error.message;
            state.isFetching = false;
        })
        .addCase(thunks.getTopHeadlinesByCountryCodeThunk.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(thunks.getTopHeadlinesByCountryCodeThunk.fulfilled, (state, action) => {
            state.mainNews.data = state.mainNews.data.concat(action.payload.articles);
            state.isFetching = false;
        })
        .addCase(thunks.getTopHeadlinesByCountryCodeThunk.rejected, (state, action) => {
            state.error = action.error.message;
            state.isFetching = false;
        })
    },
});

export const generalActions = generalSlice.actions;
export default generalSlice.reducer;

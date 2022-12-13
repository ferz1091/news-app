// Core
import { createSlice } from '@reduxjs/toolkit';

// Api
import NewsAPI from '../../api';

// Thunks
import * as thunks from './thunks';

// Type
import { PayloadAction } from '@reduxjs/toolkit';
import { HeadlineType, CachedNewsType } from '../../init/types/defaultTypes';

export type generalState = {
    country: string | null,
    mainNews: Array<HeadlineType>,
    currentTotalResults: number,
    cachedNews: Array<CachedNewsType>
    isFetching: boolean,
    error: string | undefined
};

const initialState: generalState = {
    country: null,
    mainNews: [],
    currentTotalResults: 0,
    cachedNews: [],
    isFetching: false,
    error: undefined
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setCountryCode: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
        },
        setCurrentTotalResults: (state, action: PayloadAction<number>) => {
            state.currentTotalResults = action.payload;
        },
        setHeadlines: (state, action: PayloadAction<HeadlineType[]>) => {
            state.mainNews = state.mainNews.concat(action.payload)
        }
    },
    extraReducers(builder) {
        builder.addCase(thunks.getUserCountryCodeThunk.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(thunks.getUserCountryCodeThunk.fulfilled, (state, action) => {
            state.country = action.payload.country_code.toLowerCase();
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
            state.mainNews = state.mainNews.concat(action.payload.articles);
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

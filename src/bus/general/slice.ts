// Core
import { createSlice } from '@reduxjs/toolkit';

// Thunks
import * as thunks from './thunks';

// Constants
import { regions } from '../../init/constants';

// Type
import { PayloadAction } from '@reduxjs/toolkit';
import { HeadlineType, MainNewsType, ErrorType } from '../../init/types/defaultTypes';

export type generalState = {
    country: string,
    mainNews: MainNewsType,
    cachedNews: Array<MainNewsType>
    isFetching: boolean,
    errors: Array<ErrorType>
};

const initialState: generalState = {
    country: '',
    mainNews: {data:[], page: 1, searchString: '', searchCategory: null, totalResults: 0},
    cachedNews: [],
    isFetching: false,
    errors: [{id: 'code', status: false, message: ''}, {id: 'country', status: false, message: ''}, {id: 'params', status: false, message: ''}]
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        // SET COUNTRY CODE
        setCountryCode: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
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
            state.mainNews = initialState.mainNews;
        },
        // CACHE NEWS
        cacheNews: (state, action: PayloadAction<{byCode: boolean}>) => {
            if (action.payload.byCode) {
                if (state.mainNews.searchCategory) {
                    state.cachedNews = [
                        ...state.cachedNews.filter(news => !(news.searchCategory === state.mainNews.searchCategory && news.country === state.mainNews.country)),
                        state.mainNews
                    ]
                } else {
                    state.cachedNews = [
                        ...state.cachedNews.filter(news => !(news.country === state.mainNews.country && !news.searchCategory)), state.mainNews
                    ]
                }
            } else {
                state.cachedNews = [
                    ...state.cachedNews.filter(news => news.searchString !== state.mainNews.searchString), state.mainNews
                ]
            }
        },
        // SET CACHED NEWS
        setCachedNews: (state, action: PayloadAction<MainNewsType | undefined>) => {
            if (action.payload) {
                state.mainNews = action.payload;
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(thunks.getUserCountryCodeThunk.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(thunks.getUserCountryCodeThunk.fulfilled, (state, action) => {
            state.errors = state.errors.map(error => {
                if (error.id === 'code') {
                    return {
                        ...error,
                        status: false,
                        message: ''
                    }
                } else {
                    return error;
                }
            })
            state.country = regions.some(region => region.code === action.payload.country_code.toLocaleLowerCase()) ? action.payload.country_code.toLowerCase() : 'us';
            state.isFetching = false;
            if (action.meta.arg.func) {
                action.meta.arg.func(state.country);
            }
        })
        .addCase(thunks.getUserCountryCodeThunk.rejected, (state, action) => {
            state.errors = state.errors.map(error => {
                if (error.id === 'code') {
                    return {
                        ...error,
                        status: true,
                        message: action.error.message || 'Error'
                    }
                } else {
                    return error;
                }
            })
            state.isFetching = false;
            state.country = 'us';
            if (action.meta.arg.func) {
                action.meta.arg.func(state.country);
            }
        })
        .addCase(thunks.getTopHeadlinesByCountryCodeThunk.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(thunks.getTopHeadlinesByCountryCodeThunk.fulfilled, (state, action) => {
            state.errors = state.errors.map(error => {
                if (error.id === 'country') {
                    return {
                        ...error,
                        status: false,
                        message: ''
                    }
                } else {
                    return error;
                }
            })
            state.mainNews.data = state.mainNews.data.concat(action.payload.articles);
            state.mainNews.country = action.meta.arg.countryCode;
            if (!state.mainNews.totalResults) {
                state.mainNews.totalResults = action.payload.totalResults;
            }
            state.isFetching = false;
        })
        .addCase(thunks.getTopHeadlinesByCountryCodeThunk.rejected, (state, action) => {
            state.errors = state.errors.map(error => {
                if (error.id === 'country') {
                    return {
                        ...error,
                        status: true,
                        message: action.error.message || 'Error'
                    }
                } else {
                    return error;
                }
            })
            state.isFetching = false;
        })
        .addCase(thunks.getNewsByParamsThunk.pending, (state, action) => {
            state.isFetching = true;
        })
        .addCase(thunks.getNewsByParamsThunk.fulfilled, (state, action) => {
            state.errors = state.errors.map(error => {
                if (error.id === 'params') {
                    return {
                        ...error,
                        status: false,
                        message: ''
                    }
                } else {
                    return error;
                }
            })
            state.mainNews.data = state.mainNews.data.concat(action.payload.articles);
            state.mainNews.country = action.meta.arg.countryCode;
            if (!action.meta.arg.searchString) {
                state.mainNews.searchCategory = action.meta.arg.searchCategory;
            } else {
                state.mainNews.searchString = action.meta.arg.searchString;
            }
            if (!state.mainNews.totalResults) {
                state.mainNews.totalResults = action.payload.totalResults;
            }
            state.isFetching = false;
        })
        .addCase(thunks.getNewsByParamsThunk.rejected, (state, action) => {
            state.errors = state.errors.map(error => {
                if (error.id === 'params') {
                    return {
                        ...error,
                        status: true,
                        message: action.error.message || 'Error'
                    }
                } else {
                    return error;
                }
            })
            state.isFetching = false;
        })
    },
});

export const generalActions = generalSlice.actions;
export default generalSlice.reducer;

// Core
import axios from 'axios';

// Init
import { API_KEY, pageSize } from '../init/constants';

// Types
import type { CountryCodeData, TopHeadlinesByCountryCodeType } from '../init/types/defaultTypes';

const instance = axios.create({
    withCredentials: false,
    baseURL: 'https://newsapi.org/v2',
})

const NewsAPI = {
    getUserCountryCode() {
        return (
            axios.get<CountryCodeData>('https://ipapi.co/json/')
        )
    },
    getTopHeadlinesByCountryCode(countryCode: string, page: number) {
        return (
            instance.get<TopHeadlinesByCountryCodeType>(`/top-headlines?apiKey=${API_KEY}&country=${countryCode}&pageSize=${pageSize}&page=${page}`)
        )
    },
    getTopHeadlinesByCategory(countryCode: string, page: number, searchCategory: string) {
        return (
            instance.get<TopHeadlinesByCountryCodeType>(`/top-headlines?apiKey=${API_KEY}&country=${countryCode}&category=${searchCategory}&pageSize=${pageSize}&page=${page}`)
        )
    },
    getNewsByString(searchString: string, page: number) {
        return (
            instance.get<TopHeadlinesByCountryCodeType>(`/everything?apiKey=${API_KEY}&q=${searchString}&pageSize=${pageSize}&page=${page}`)
        )
    }
};

export default NewsAPI;

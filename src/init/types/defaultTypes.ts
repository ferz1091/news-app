export type CountryCodeData = {
        country_code: string;
}

export type HeadlineType = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: any | null, name: string };
    title: string;
    url: string;
    urlToImage: string; 
};

export type TopHeadlinesByCountryCodeType = {
    articles: HeadlineType[],
    status: string,
    totalResults: number
}

export type CachedNewsType = {
    data: Array<HeadlineType>, 
    country: string, 
    page: number
}

export type CountryCodeData = {
        country_code: string;
};

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
};

export type MainNewsType = {
    data: Array<HeadlineType>,
    page: number,
    searchString: string,
    searchCategory: string | null,
    totalResults: number
    country?: string
}

export type ErrorType = {
    id: string,
    status: boolean,
    message: string
}

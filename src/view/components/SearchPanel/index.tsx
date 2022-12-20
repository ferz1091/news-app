// Core
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, TextField, Autocomplete, Box, Typography, Button } from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Types
import { MainNewsType } from '../../../init/types/defaultTypes';
type SearchPanelProps = {
    countryCode: string;
    page: number;
    sidePanelIsVisible: boolean;
    toggleSidePanelIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    cacheNews: (byCode: boolean, code?: string) => void;
    resetMainNews: () => void;
    getNewsByParams: (searchString: string, searchCategory: string, countryCode: string, page: number) => void;
    mainNews: MainNewsType;
}

export const SearchPanel: React.FC<SearchPanelProps> = (props) => {
    const {sidePanelIsVisible, toggleSidePanelIsVisible, cacheNews, resetMainNews, getNewsByParams, countryCode, page, mainNews} = props;
    const [searchString, setSearchString] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<string>('');
    const [isSearchWasSubmitted, toggleIsSearchWasSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();
    return (
        <Drawer 
            open={sidePanelIsVisible} 
            anchor='left' 
            onClose={() => {
                toggleSidePanelIsVisible(false);
                setSearchString('');
                setSearchCategory('');
            }}
        >
            <TextField
                label='Search'
                sx={{ width: '200px', m: '10px'}}
                defaultValue={searchString}
                onChange={(e) => setSearchString(e.target.value)}
            />
            <Autocomplete
                blurOnSelect='mouse'
                options={['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']}
                renderInput={(params) => <TextField {...params} label='Category' />}
                sx={{
                    width: '200px',
                    m: '10px'
                }}
                onChange={(e, value) => setSearchCategory(value ? value : '')}
                disabled={!!searchString}
            />
            <Box sx={{ position: 'absolute', bottom: '0' }}>
                {isSearchWasSubmitted && !searchString && !searchCategory ?
                    <Typography sx={{ textAlign: 'center', color: '#d32f2f', fontWeight: '600' }}>
                        Enter the parameters
                    </Typography>
                    :
                    null
                }
                <Button
                    startIcon={<SearchIcon />}
                    variant='contained'
                    color={isSearchWasSubmitted && !searchString && !searchCategory ? 'error' : 'primary'}
                    sx={{ width: '200px', m: '10px' }}
                    onClick={() => {
                        toggleIsSearchWasSubmitted(true);
                        if (searchString || searchCategory) {
                            cacheNews(!searchString);
                            navigate(`/news/${searchCategory ? `${searchCategory}_${mainNews.country}` : 'category'}/${searchString ? searchString : 'query'}`)
                            resetMainNews();
                            setSearchString('')
                            setSearchCategory('');
                            toggleIsSearchWasSubmitted(false);
                            toggleSidePanelIsVisible(false);
                        }
                    }}
                >
                    Search
                </Button>
            </Box>
        </Drawer>
    )
}

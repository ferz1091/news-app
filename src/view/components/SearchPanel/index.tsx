// Core
import React, {useState} from 'react';
import { Drawer, TextField, Autocomplete, Box, Typography, Button } from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Types
type SearchPanelProps = {
    sidePanelIsVisible: boolean;
    toggleSidePanelIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({sidePanelIsVisible, toggleSidePanelIsVisible}) => {
    const [searchString, setSearchString] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<string | null>(null);
    const [isSearchWasSubmitted, toggleIsSearchWasSubmitted] = useState<boolean>(false);
    return (
        <Drawer open={sidePanelIsVisible} anchor='right' onClose={() => toggleSidePanelIsVisible(false)}>
            <TextField
                label='Search'
                sx={{ width: '200px', m: '10px' }}
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
                onChange={(e, value) => setSearchCategory(value)}
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
                    onClick={() => toggleIsSearchWasSubmitted(true)}
                >
                    Search
                </Button>
            </Box>
        </Drawer>
    )
}

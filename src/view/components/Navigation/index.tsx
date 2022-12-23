// Core
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    AppBar, 
    Toolbar, 
    Box, 
    IconButton, 
    Button, 
    Menu, 
    MenuItem, 
    Avatar, 
    Typography, 
    Badge } from '@mui/material';

// Bus
import { useGeneral } from '../../../bus/general';

// Components
import { SearchPanel } from '../SearchPanel';

// Constants
import { regions } from '../../../init/constants';

// Tools
import { useAppSelector } from '../../../tools';

// Icons
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';

export const Navigation: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [sidePanelIsVisible, toggleSidePanelIsVisible] = useState<boolean>(false);
    const {country, mainNews} = useAppSelector(state => state.general);
    const {resetMainNews, cacheNews, getNewsByParams} = useGeneral();
    const navigate = useNavigate();
    const params = useParams<{code?: string, category?: string, query?: string}>();
    return (
        <AppBar sx={{minHeight: '64px'}}>
            <Toolbar>
                <IconButton 
                    onClick={() => toggleSidePanelIsVisible(true)} 
                    sx={{color:'white'}}
                >
                    <SearchIcon sx={{position: 'relative', top: {sm: '0px', xs: '5px'}}}/>
                </IconButton>
                <Box sx={{
                    display: 'flex', position: 'relative',
                    left: {xs: 'calc(100vw - 230px)', sm: 'calc(100vw - 250px)'},
                    top: {xs: '5px', sm: '0'}
                    }}
                >
                    {params.code || params.category ? 
                        <Badge 
                            badgeContent={params.code ? params.code : params.category !== 'category' ? mainNews.country?.slice(-2) : country} 
                            color='error'
                        >
                            <Avatar 
                                src={`https://flagsapi.com/${params.code ? params.code?.toUpperCase() : params.category !== 'category' ? mainNews.country?.slice(-2).toUpperCase() : country.toUpperCase()}/flat/32.png`} 
                                sx={{ width: '32px', height: '32px' }}
                            >
                                {mainNews.country || country}
                            </Avatar>
                        </Badge> 
                        : 
                        null
                    }
                    <Button 
                        variant='contained' 
                        endIcon={<LanguageIcon />} 
                        sx={{
                            ml: '15px',
                            backgroundColor: 'secondary.main',
                            color: 'primary.main',
                            ":hover": { color: 'secondary.main'}
                        }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
                        children='Region'
                    />
                </Box>
                <Menu 
                    open={Boolean(anchorEl)} 
                    anchorEl={anchorEl} 
                    onClose={() => setAnchorEl(null)}
                    sx={{
                        ".MuiMenu-paper": {
                            pl: '5px', 
                            height: '150px', 
                            width: '108.5px', 
                            "::-webkit-scrollbar": { width: '5px' }, 
                            "::-webkit-scrollbar-thumb": { backgroundColor: 'primary.main', borderRadius: '5px'}
                        }
                    }}
                >
                    {regions.map(region => 
                        <MenuItem 
                            key={region.code} 
                            onClick={() => {
                                setAnchorEl(null);
                                cacheNews(!mainNews.searchString);
                                resetMainNews();
                                navigate(`/country/${region.code}`)
                            }}
                            disableGutters={true}
                            sx={{
                                pl: '10px', 
                                ":active": {
                                    bgcolor: 'primary.main', 
                                    transition: 'all 0.5s linear', 
                                    color: 'secondary.main'
                                }
                            }}
                            divider
                        >
                            <Avatar 
                                alt={region.code} 
                                src={`https://flagsapi.com/${region.code.toUpperCase()}/flat/16.png`}
                                sx={{height: '16px', width: '16px'}}
                            />
                            <Typography 
                                children={region.label} 
                                variant='caption' 
                                pl='5px'
                            />
                        </MenuItem>
                    )}
                </Menu>
                <SearchPanel
                    mainNews={mainNews}
                    countryCode={country}
                    page={mainNews.page}
                    resetMainNews={resetMainNews}
                    cacheNews={cacheNews}
                    getNewsByParams={getNewsByParams}
                    sidePanelIsVisible={sidePanelIsVisible} 
                    toggleSidePanelIsVisible={toggleSidePanelIsVisible}
                />
            </Toolbar>
        </AppBar>
    )
}

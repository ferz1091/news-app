// Core
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem, ListItemButton, Divider, Button, Menu, MenuItem, Avatar, Typography, Badge} from '@mui/material';

// Bus
import { useGeneral } from '../../../bus/general';

// Constants
import { regions } from '../../../init/constants';

// Tools
import { useAppSelector } from '../../../tools';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LanguageIcon from '@mui/icons-material/Language';

export const Navigation: React.FC = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {country} = useAppSelector(state => state.general);
    const {resetMainNews, setCountryCode, setMainNewsPage} = useGeneral();
    return (
        <AppBar sx={{minHeight: '64px'}}>
            <Toolbar>
                <IconButton onClick={() => setDrawerIsOpen(!drawerIsOpen)} sx={{color:'white'}}>
                    <MenuIcon />
                </IconButton>
                <Box sx={{
                    display: 'flex', position: 'relative',
                    left: 'calc(100vw - 250px)',
                    top: {xs: '5px', sm: '0'}
}}>
                    {country ? <Badge badgeContent={country} color='error'><Avatar src={`https://flagsapi.com/${country.toUpperCase()}/flat/32.png`} sx={{ width: '32px', height: '32px' }}>{country}</Avatar></Badge> : null}
                    <Button 
                        variant='contained' 
                        endIcon={<LanguageIcon />} 
                        sx={{
                            ml: '15px',
                            backgroundColor: 'white',
                            color: '#1976d2',
                            ":hover": {color: 'white'}
                        }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
                    >
                        Region
                    </Button>
                </Box>
                <Menu 
                    open={Boolean(anchorEl)} 
                    anchorEl={anchorEl} 
                    onClose={() => setAnchorEl(null)}
                    sx={{ ".MuiMenu-paper": { height: '150px', width: '113.5px', "::-webkit-scrollbar": { width: '5px' }, "::-webkit-scrollbar-thumb": { backgroundColor: '#1976d2', borderRadius: '5px'}}}}
                >
                    {regions.map(region => 
                        <MenuItem 
                            key={region} 
                            onClick={() => {
                                setAnchorEl(null);
                                resetMainNews();
                                setMainNewsPage(1);
                                setCountryCode(region);
                            }}
                        >
                            <Avatar 
                                alt={region} 
                                src={`https://flagsapi.com/${region.toUpperCase()}/flat/16.png`}
                                sx={{height: '16px', width: '16px'}}
                            />
                            <Typography children={region.toUpperCase()} variant='caption' pl='5px' />
                        </MenuItem>
                    )}
                </Menu>
                <Drawer 
                    anchor='left'
                    open={drawerIsOpen}
                    onClose={() => setDrawerIsOpen(false)}
                >
                    <IconButton onClick={() => setDrawerIsOpen(false)}>
                        <ChevronLeftIcon 
                            color='primary' 
                            fontSize='medium' 
                        />
                    </IconButton>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemButton>
                                Home
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                News
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                App
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}

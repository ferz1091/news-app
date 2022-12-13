// Core
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, Divider } from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const Navigation: React.FC = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    return (
        <AppBar sx={{minHeight: '64px'}}>
            <Toolbar>
                <IconButton onClick={() => setMenuIsOpen(!menuIsOpen)} sx={{color:'white'}}>
                    <MenuIcon />
                </IconButton>
                <NavLink to='/'>
                    Main
                </NavLink>
                <NavLink to='/test'>
                    TEST
                </NavLink>
                <Drawer 
                    anchor='left'
                    open={menuIsOpen}
                    onClose={() => setMenuIsOpen(false)}
                >
                    <IconButton onClick={() => setMenuIsOpen(false)}>
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

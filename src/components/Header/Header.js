import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

// AppBar imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Styles
import styles from './Header.module.scss';

function NavDrawer(theme) {
    const [drawerState, setDrawerState] = useState({ left: false });

    const anchor = 'left';

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState({ [anchor]: open });
    };

    // LINKS TO GO INSIDE MENU/DRAWER
    const list = (anchor) => (
        <Box
            sx={{
                height: '100%'
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link
                    to={`/`}
                    className={styles.link}
                >
                    <ListItem
                        button
                        key={`Home`}
                    >

                        <ListItemText
                            primary={`Home`}
                            sx={{
                                fontWeight: (theme) => theme.typography.fontWeightBold,
                                fontVariant: 'small-caps',
                                paddingLeft: '15px',
                            }}
                        />
                    </ListItem>
                </Link>
                {['About', 'Gallery'].map((text, index) => (
                    <Link
                        key={text}
                        to={`/${text}`}
                        className={styles.link}
                    >
                        <ListItem
                            button
                            key={text}
                        >

                            <ListItemText
                                primary={text}
                                sx={{
                                    fontWeight: (theme) => theme.typography.fontWeightBold,
                                    fontVariant: 'small-caps',
                                    paddingLeft: '15px',
                                }}
                            />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box >
    );

    return (
        <>
            <Box sx={{
                flexGrow: 1,
            }}>
                <AppBar position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        // boxShadow: 'none'
                    }}>
                    <Toolbar>
                        <Drawer
                            anchor={anchor}
                            open={drawerState[anchor]}
                            onClose={toggleDrawer(anchor, false)}>

                            <div
                                className={styles.list}>
                                {list(anchor)}
                            </div>
                        </Drawer>
                        <IconButton
                            onClick={drawerState.left === false ?
                                toggleDrawer(anchor, true)
                                :
                                toggleDrawer(anchor, false)
                            }
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuOpenIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{
                            flexGrow: 1,
                            fontVariant: 'small-caps'
                        }}>
                            Mullen Photography
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
}

export default NavDrawer;

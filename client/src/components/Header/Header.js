import React, { useState } from 'react';
import Link from '@mui/material/Link';
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
                <ListItem
                    button
                    key={`Home`}
                >
                    <Link
                        href={`/`}
                        color="inherit"
                        underline="none"
                    >
                        <ListItemText
                            primary={`Home`}
                            sx={{
                                fontWeight: (theme) => theme.typography.fontWeightBold,
                                fontVariant: 'small-caps'
                            }}
                        />
                    </Link>
                </ListItem>
                {['About', 'Gallery'].map((text, index) => (
                    <ListItem
                        button
                        key={text}
                    // className={styles.listItemText}
                    >
                        <Link
                            href={`/${text}`}
                            color="inherit"
                            underline="none"
                        >
                            <ListItemText
                                primary={text}
                                sx={{
                                    fontWeight: (theme) => theme.typography.fontWeightBold,
                                    fontVariant: 'small-caps'
                                }}
                            />
                        </Link>
                    </ListItem>
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
                                {/* <Button color="inherit">Login</Button> */}
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

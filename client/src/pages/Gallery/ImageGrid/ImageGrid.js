import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styles from './ImageGrid.module.scss';
import Paper from '@mui/material/Paper'

import portland from './portland.jpeg';



function ImageGrid() {

    const [orientation, setOrientation] = useState(window.orientation);
    const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
    const [columnCount, setColumnCount] = useState(vw < 600 ? (vw < 500 ? 1 : 2) : 3);

    useEffect(() => {
        if (orientation === 0) {
            setColumnCount(1);
        } else if (orientation === 90) {
            vw < 1000 ?
                setColumnCount(2) : setColumnCount(3)
        }
    }, [orientation, vw])

    const imageData = [
        {
            img: portland,
            title: 'Portland',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
    ];

    window.addEventListener('orientationchange', (e) => {
        setVw(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
        setOrientation(window.orientation)
    })

    return (
        <Box>
            <Paper>
                <ImageList
                    cols={columnCount}
                    gap={8}>
                    {imageData.map((item) => (
                        <ImageListItem
                            key={item.img}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                className={styles.img}
                                src={`${item.img}?w=500&h=500&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=500&h=500&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Paper>
        </Box >
    );
};

export default ImageGrid;
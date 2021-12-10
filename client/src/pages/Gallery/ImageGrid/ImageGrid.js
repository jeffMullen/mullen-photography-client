import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styles from './ImageGrid.module.scss';
import Paper from '@mui/material/Paper'
import imageData from '../../../mullen-photos/photographs';



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
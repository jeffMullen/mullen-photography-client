import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';
import imageData from '../../../mullen-photos/photographs';
import SinglePhoto from './SinglePhoto/SinglePhoto';

import { useHistory } from 'react-router-dom';

function ImageGrid() {

    const [orientation, setOrientation] = useState(window.orientation);
    const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
    const [columnCount, setColumnCount] = useState(vw < 600 ? (vw < 500 ? 1 : 2) : 3);

    useEffect(() => {
        if (orientation === 0) {
            setColumnCount(1);
        } else if (orientation === 90) {
            vw < 1000 ?
                setColumnCount(2) : setColumnCount(3);
        }
    }, [orientation, vw]);

    window.addEventListener('orientationchange', (e) => {
        setVw(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
        setOrientation(window.orientation);
    });

    let history = useHistory();

    const routeToPhoto = (e) => {
        const data = JSON.parse(e.currentTarget.dataset.photo);
        const title = data.title;
        console.log(data)
        console.log(title)

        history.push(`/Photograph/${title}`);

    }

    return (
        <Box>
            <Paper>
                <ImageList
                    cols={columnCount}
                    gap={8}>
                    {imageData.map((item) => {
                        return <SinglePhoto
                            key={item.img}
                            item={item}
                            routeToPhoto={routeToPhoto}
                        />
                    })}
                </ImageList>
            </Paper>
        </Box >
    );
};

export default ImageGrid;
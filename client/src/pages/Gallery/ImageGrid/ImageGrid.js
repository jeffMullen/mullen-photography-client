import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';
import imageData from '../../../mullen-photos/photographs';
import SinglePhoto from './SinglePhoto/SinglePhoto';
import { CHANGE_SINGLE_PHOTO } from '../../../utils/actions';
import { useStoreContext } from '../../../utils/GlobalState';

import { useHistory } from 'react-router-dom';

function ImageGrid() {
    const [state, dispatch] = useStoreContext();

    console.log(state);

    const { photo } = state;

    console.log(photo)

    const [orientation, setOrientation] = useState(window.orientation);
    const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
    const [columnCount, setColumnCount] = useState(vw < 600 ? (vw < 500 ? 1 : 2) : 3);


    // Check which orientation a mobile phone is in and display accordingly
    useEffect(() => {
        if (orientation === 0) {
            setColumnCount(1);
        } else if (orientation === 90) {
            vw < 1000 ?
                setColumnCount(2) : setColumnCount(3);
        }
    }, [orientation, vw]);

    // Listen for a change in mobile orientation
    window.addEventListener('orientationchange', (e) => {
        setVw(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
        setOrientation(window.orientation);
    });

    let history = useHistory();

    // re-route to full sized image display with full photo data on Photograph page
    const routeToPhoto = async (e) => {
        const data = JSON.parse(e.currentTarget.dataset.photo);
        const title = data.title;
        console.log(data)
        console.log(title)

        await dispatch({
            type: CHANGE_SINGLE_PHOTO,
            photo: data,
        });

        history.push(`/Photograph/:${title}`);
    };

    // Set photo state to local storage when photo state is changed
    useEffect(() => {
        window.localStorage.setItem('photo', JSON.stringify(photo));
    }, [photo]);

    // useEffect(() => {
    //     dispatch({
    //         type: CHANGE_SINGLE_PHOTO,
    //         photo: JSON.parse(window.localStorage.getItem('photo')),
    //     })
    // }, []);

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
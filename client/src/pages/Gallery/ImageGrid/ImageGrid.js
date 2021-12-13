import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import imageData from '../../../mullen-photos/photographs';
import SinglePhoto from './SinglePhoto/SinglePhoto';
import { CHANGE_SINGLE_PHOTO } from '../../../utils/actions';
import { useStoreContext } from '../../../utils/GlobalState';
import styles from './ImageGrid.module.scss';

import { useHistory } from 'react-router-dom';

function ImageGrid() {
    const [state, dispatch] = useStoreContext();

    console.log(state);

    const { photo } = state;

    console.log(photo)

    const [orientation, setOrientation] = useState(window.orientation);
    const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
    const [columnCount, setColumnCount] = useState(vw < 600 ? (vw < 500 ? 1 : 2) : 3);

    // MODAL STATE
    const [open, setOpen] = React.useState(false);
    // MODAL FUNCTIONS
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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

    // let history = useHistory();

    // Re-route to full sized image display with full photo data on Photograph page
    const routeToPhoto = async (e) => {
        const data = JSON.parse(e.currentTarget.dataset.photo);
        const title = data.title;
        console.log(data)
        console.log(title)

        // Set photo details to local storage
        window.localStorage.setItem('photo', JSON.stringify(data));

        // history.push(`/Photograph/:${title}`);

        handleOpen();
    };

    // Set single photo in state using local storage data
    useEffect(() => {
        dispatch({
            type: CHANGE_SINGLE_PHOTO,
            photo: JSON.parse(window.localStorage.getItem('photo')),
        });
    }, [dispatch]);


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
                            handleOpen={handleOpen}
                        />
                    })}
                </ImageList>
            </Paper>

            {/* Modal displaying image appears when images are clicked */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        // top: '50%',
                        // left: '50%',
                        // transform: 'translate(-50%, -50%)',
                        height: '95%',
                        // width: '95%',
                        bgcolor: 'background.paper',
                        // border: '1px solid black',
                        outline: 'none',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',

                    }}
                >
                    <img src={photo.img}
                        className={styles.dimensions}
                        alt={`Title: ${photo.title}`}
                    ></img>
                </Box>
            </Modal>
        </Box >
    );
};

export default ImageGrid;
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import imageData from '../../../mullen-photos/photographs';
import SinglePhoto from './SinglePhoto/SinglePhoto';
import { CHANGE_SINGLE_PHOTO } from '../../../utils/actions';
import { useStoreContext } from '../../../utils/GlobalState';
import styles from './ImageGrid.module.scss';

function ImageGrid() {
    const [state, dispatch] = useStoreContext();

    const { photo } = state;

    const [orientation, setOrientation] = useState(window.orientation);
    const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
    const [columnCount, setColumnCount] = useState(vw < 600 ? (vw < 500 ? 1 : 2) : 3);

    // MODAL STATE
    const [open, setOpen] = React.useState(false);
    // MODAL FUNCTIONS
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // MODAL photo text info state - displayed or hidden
    const [isShown, setIsShown] = useState(false);

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

    // Send full sized image to Modal Display when image is clicked
    const routeToPhoto = async (e) => {
        const data = JSON.parse(e.currentTarget.dataset.photo);
        const title = data.title;
        console.log(data)
        console.log(title)

        // Set photo details to local storage
        window.localStorage.setItem('photo', JSON.stringify(data));

        dispatch({
            type: CHANGE_SINGLE_PHOTO,
            photo: JSON.parse(window.localStorage.getItem('photo')),
        });

        handleOpen();
    };

    let visibility;

    if (isShown) {
        visibility = styles.information;
    } else {
        visibility = styles.hidden;
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
                        position: 'relative',
                        height: '95%',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        outline: 'none',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img src={photo.img}
                        className={styles.dimensions}
                        alt={`Title: ${photo.title}`}
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                    ></img>
                    <div
                        className={styles.dimensions}
                    >
                        <div
                            id='information'
                            className={visibility}
                            // className={styles.information}
                            onMouseEnter={() => setIsShown(true)}
                        >
                            <Typography
                                variant='h5'
                                component='h3'
                                sx={{
                                    fontVariant: 'small-caps',
                                    display: 'inline-block',
                                }}
                            >
                                {`${photo.title} -`}
                            </Typography>
                            <Typography
                                variant='p'
                                component='p'
                                sx={{
                                    marginLeft: '10px',
                                    display: 'inline-block',
                                }}
                            >
                                {`${photo.photographer}`}
                            </Typography>
                            <Typography
                                variant='p'
                                component='p'
                                sx={{
                                    marginTop: '20px',
                                    fontStyle: 'italic'
                                }}
                            >
                                {photo.description}
                            </Typography>
                        </div>

                    </div>
                </Box>
            </Modal>
        </Box >
    );
};

export default ImageGrid;
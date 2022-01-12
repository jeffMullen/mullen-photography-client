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
import ImageModal from './ImageModal/ImageModal';


function ImageGrid() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;
    const { photo } = state;

    const [category, setCategory] = useState(currentCategory);


    // FILTERING IMAGE LIST to be rendered based on currentCategory
    let filteredImages = [];

    if (currentCategory === 'All') {
        filteredImages = imageData;
    } else {
        filteredImages = imageData.filter(image =>
            image.category === currentCategory
        );
    }
    const [imgArrLength, setImgArrLength] = useState(filteredImages.length);

    // window.onload()
    // setImgArrLength(filteredImages.length);

    console.log("filtered images", filteredImages)
    console.log("ARRAY LENGTH", imgArrLength);


    // ORIENTATION, VIEW WIDTHS, and COLUMN COUNT state
    const [orientation, setOrientation] = useState(window.orientation);
    const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
    const [columnCount, setColumnCount] = useState(vw < 600 ? (vw < 500 ? 1 : 2) : 3);

    // MODAL STATE
    const [open, setOpen] = useState(false);
    // MODAL FUNCTIONS
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // MODAL photo text info state - displayed or hidden
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setImgArrLength(filteredImages.length);
    }, [filteredImages])
    console.log(imgArrLength);

    // Check which orientation a mobile phone is in and display accordingly
    useEffect(() => {
        // setImgArrLength

        if (orientation === 0) {
            setColumnCount(1);
        } else if (orientation === 90) {
            // If screen is landscape and less than 1000px
            if (vw < 1000) {
                if (imgArrLength === 1) {
                    setColumnCount(1)
                } else {
                    setColumnCount(2)
                }
            } else {
                if (imgArrLength === 1) {
                    setColumnCount(1);
                } else if (imgArrLength === 2) {
                    setColumnCount(2);
                } else if (imgArrLength === 3) {
                    console.log("HIT")
                    setColumnCount(3);
                }
            }
            // if (imgArrLength < 2 || vw < 1000) {
            //     setColumnCount(2)
            // }
            // vw < 1000 ?
            //     setColumnCount(2) : setColumnCount(3);
        }
    }, [orientation, vw, imgArrLength, category]);

    console.log("COLUMN COUNT", columnCount);


    // Listen for a change in mobile orientation
    window.addEventListener('orientationchange', (e) => {
        setVw(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
        setOrientation(window.orientation);
    });



    // Send full sized image to Modal Display when image is clicked
    const routeToPhoto = async (e) => {
        console.log(e.currentTarget.dataset.photo)
        const data = JSON.parse(e.currentTarget.dataset.photo);

        // Set photo details to local storage
        window.localStorage.setItem('photo', JSON.stringify(data));

        dispatch({
            type: CHANGE_SINGLE_PHOTO,
            photo: JSON.parse(window.localStorage.getItem('photo')),
        });

        handleOpen();
    };



    // Setting the visibility of the photo info in modal - based on isShown local state
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
                    {filteredImages.map((item) => {
                        return <SinglePhoto
                            key={item.img}
                            item={item}
                            routeToPhoto={routeToPhoto}
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
                    <ImageModal />

                </Box>
            </Modal>
            {/* <Modal
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
            </Modal> */}
        </Box >
    );
};

export default ImageGrid;
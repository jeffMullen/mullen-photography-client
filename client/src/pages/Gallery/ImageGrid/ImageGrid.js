import React, { useState, useEffect } from 'react';

// MUI components
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

// External Sources - Custom Components and Image Data
import ImageModal from './ImageModal/ImageModal';
import SinglePhoto from './SinglePhoto/SinglePhoto';
import imageData from '../../../mullen-photos/photographs';
import styles from './ImageGrid.module.scss';

// State Management
import { CHANGE_SINGLE_PHOTO } from '../../../utils/actions';
import { useStoreContext } from '../../../utils/GlobalState';


function ImageGrid() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

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


    // ORIENTATION, VIEW WIDTHS, and COLUMN COUNT state
    // const [orientation, setOrientation] = useState(window.orientation);
    // console.log(window.matchMedia("(orientation: landscape)"))

    const [media, setMedia] = useState(window.matchMedia("(orientation: landscape)").matches);
    console.log(media);

    // IF STATEMENTS TO DETERMINE WHAT BROWSER IT IS.  SET ORIENTATION STATE BY THE METHOD OF EACH BROWSER
    console.log(window.navigator.userAgent)

    // const [orientation, setOrientation] = useState(window.screen.orientation.type.split('-')[0] || window.orientation);
    const [orientation, setOrientation] = useState(media === true ? 'landscape' : 'portrait');
    console.log('orientation', orientation)
    // const [orientation, setOrientation] = useState(window.screen.orientation.type.split('-')[0] || (media ? 'landscape' : 'portrait'));
    // console.log('orientation', orientation)
    const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
    const [columnCount, setColumnCount] = useState(vw < 600 ? (vw < 500 ? 1 : 2) : 3);

    // MODAL STATE
    const [open, setOpen] = useState(false);
    // MODAL FUNCTIONS
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // Whenever filteredImages array changes, setImgArrLength to the new length
    useEffect(() => {
        setImgArrLength(filteredImages.length);
    }, [filteredImages])


    // Check which orientation a mobile phone is in and display accordingly
    useEffect(() => {
        if (orientation === 'portrait') {
            setColumnCount(1);
        } else if (orientation === 'landscape') {
            // If screen is landscape and less than 1000px
            if (vw < 1000) {
                if (imgArrLength === 1) {
                    setColumnCount(1)
                } else {
                    setColumnCount(2)
                }
            } else {    // Desktop column count
                if (imgArrLength === 1) {
                    setColumnCount(1);
                } else if (imgArrLength === 2) {
                    setColumnCount(2);
                } else {
                    setColumnCount(3);
                }
            }
        }
    }, [orientation, vw, imgArrLength, category]);

    useEffect(() => {
        // setOrientation(media === true ? 'landscape' : 'portrait')
        console.log(orientation)
    }, [media, orientation])

    // Listen for a change in mobile orientation
    window.addEventListener('orientationchange', (e) => {
        setVw(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
        setMedia(window.matchMedia("(orientation: landscape)").matches)
        // setOrientation(media === true ? 'landscape' : 'portrait');
        // console.log('Orientation Change:', orientation)
        // setOrientation(window.screen.orientation.type.split('-')[0]);
    });



    // Send full sized image to Modal Display when image is clicked
    const routeToPhoto = async (e) => {
        const data = JSON.parse(e.currentTarget.dataset.photo);

        // Set photo details to local storage
        window.localStorage.setItem('photo', JSON.stringify(data));

        dispatch({
            type: CHANGE_SINGLE_PHOTO,
            photo: JSON.parse(window.localStorage.getItem('photo')),
        });

        handleOpen();
    };



    return (
        <Box>
            {columnCount === 1 ?
                //  At 1 column:: Set a max width to the paper component to constrain image display size
                <Paper
                    sx={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <ImageList
                        rowHeight={300}
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

                :

                // Otherwise:: No set paper width
                <ImageList
                    rowHeight={300}
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
            }

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
                    background: 'rgba(0, 0, 0, .25)'
                }}
            >
                <Box
                    className={styles.modalBox}
                    sx={{
                        position: 'relative',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Conent of the modal */}
                    <ImageModal
                        filteredImages={filteredImages}
                        orientation={orientation}
                        handleClose={handleClose}
                        vw={vw}
                    />

                </Box>
            </Modal>
        </Box >
    );
};

export default ImageGrid;
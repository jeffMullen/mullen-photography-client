import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useStoreContext } from '../../../../utils/GlobalState';
import styles from './ImageModal.module.scss';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';


function ImageModal({ filteredImages, orientation, handleClose, vw }) {
    const [state, dispatch] = useStoreContext();

    let statePhoto = state.photo;

    const [photo, setPhoto] = useState(statePhoto);

    const [currentIndex, setCurrentIndex] = useState(filteredImages.findIndex(index => index.img === statePhoto.img));

    const [isShown, setIsShown] = useState(false);

    let mobile;

    if (vw < 1000) {
        mobile = true;
    } else {
        mobile = false;
    }


    // Setting the visibility of the photo info in modal - based on isShown local state
    // Show information if in mobile portrait mode, if tapped on mobile landscape mode, and if hovered on desktop
    let visibility;

    if (orientation === 'portrait' || (orientation === 'landscape' && isShown)) {
        visibility = styles.information;
    }
    else {
        visibility = styles.hidden;
    };

    // Disable forward and back buttons if currentIndex is 0 or last index
    let back;
    let mobileBack;

    if (currentIndex === 0) {
        back = `${styles.disable} ${styles.back}`;
        mobileBack = back;
    } else {
        back = `${styles.back} ${styles.buttonBack}`;
        mobileBack = `${styles.back} ${styles.mobileButton} ${styles.hightlight}`;
    }


    let forward;
    let mobileForward;

    if (currentIndex === filteredImages.length - 1) {
        forward = `${styles.disable} ${styles.forward}`;
        mobileForward = forward;
    } else {
        forward = `${styles.forward} ${styles.buttonForward}`;
        mobileForward = `${styles.forward} ${styles.mobileButton} ${styles.hightlight}`;
    }


    // Cycle through photos in the filteredImages array
    // When forward and back arrows are clicked
    const changePhoto = (e) => {
        let id = e.currentTarget.id;

        // if it is forward - change photo to index + 1;  if back index -1
        if (id === 'forward') {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // When currentIndex is changed - set the new photo
    useEffect(() => {
        setPhoto(filteredImages[currentIndex]);
    }, [currentIndex, filteredImages])

    return (
        <>
            <button
                className={styles.close}
                onClick={() => handleClose()}
            >
                X
            </button>
            {/* If it is the first photo, disable the onClick attribute */}
            {currentIndex === 0 ?
                <div
                    className={mobile ? mobileBack : back}
                    id='back'
                >
                    <ArrowBackIosNewIcon
                        fontSize='large'
                    />
                </div>

                :

                <div
                    className={mobile ? mobileBack : back}
                    onClick={(e) => {
                        changePhoto(e)
                    }}
                    onTouchStart={() => {
                        console.log("START")
                        // mobileBack = `${styles.back} ${styles.buttonBack}`
                    }
                    }
                    onTouchEnd={() => {
                        console.log("END")
                        // mobileBack = `${styles.back} ${styles.mobileButton}`
                    }
                    }
                    id='back'
                >
                    <ArrowBackIosNewIcon
                        fontSize='large'
                    />
                </div>
            }
            <Box
                sx={{
                    position: 'relative',
                    height: '95%',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    outline: 'none',
                    p: {
                        xs: 0,
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                {/* For mobile landscape, show photo information on screen tap */}
                {/* For desktop, show photo information on mouse enter or leave (HOVER) */}
                {vw < 1000 ?
                    <img src={photo.img}
                        className={styles.dimensions}
                        alt={`Title: ${photo.title}`}
                        onClick={() => !isShown ? setIsShown(true) : setIsShown(false)}
                    ></img>

                    :

                    <img src={photo.img}
                        className={styles.dimensions}
                        alt={`Title: ${photo.title}`}
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                    ></img>
                }

                {/* Photo information */}
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

            {/* FORWARD CYCLE BUTTON */}
            {/* If it is the last photo, disable the onClick attribute */}
            {currentIndex === filteredImages.length - 1 ?
                <div
                    className={mobile ? mobileForward : forward}
                    id='forward'
                >
                    <ArrowForwardIosIcon
                        fontSize='large'
                    />
                </div>

                :

                <div
                    className={mobile ? mobileForward : forward}
                    onClick={(e) => {
                        changePhoto(e)
                    }}
                    id='forward'
                >
                    <ArrowForwardIosIcon
                        fontSize='large'
                    />
                </div>
            }
        </>
    )
};

export default ImageModal;
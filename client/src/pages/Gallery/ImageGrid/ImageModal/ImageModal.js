import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useStoreContext } from '../../../../utils/GlobalState';
import styles from './ImageModal.module.scss';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function ImageModal({ filteredImages }) {
    const [state, dispatch] = useStoreContext();

    let statePhoto = state.photo;

    const [photo, setPhoto] = useState(statePhoto);

    const [currentIndex, setCurrentIndex] = useState(filteredImages.findIndex(index => index.img === statePhoto.img));

    const [isShown, setIsShown] = useState(false);


    // Setting the visibility of the photo info in modal - based on isShown local state
    let visibility;

    if (isShown) {
        visibility = styles.information;
    } else {
        visibility = styles.hidden;
    };

    // Disable forward and back buttons if currentIndex is 0 or last index
    let back;

    if (currentIndex === 0) {
        back = `${styles.disable} ${styles.back}`;
    } else {
        back = `${styles.back} ${styles.buttonBack}`;
    }

    let forward;

    if (currentIndex === filteredImages.length - 1) {
        forward = `${styles.disable} ${styles.forward}`;
    } else {
        forward = `${styles.forward} ${styles.buttonForward}`;
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
            {/* If it is the first photo, disable the onClick attribute */}
            {currentIndex === 0 ?
                <div
                    className={back}
                    id='back'
                >
                    <ArrowBackIosNewIcon
                        fontSize='large'
                    />
                </div>

                :

                <div
                    className={back}
                    onClick={(e) => {
                        changePhoto(e)
                    }}
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
                    // width: '100%',
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

                <img src={photo.img}
                    className={styles.dimensions}
                    alt={`Title: ${photo.title}`}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                ></img>



                <div
                    // className={styles.dimensions}
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
                    className={forward}
                    id='forward'
                >
                    <ArrowForwardIosIcon
                        fontSize='large'
                    />
                </div>

                :

                <div
                    className={forward}
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
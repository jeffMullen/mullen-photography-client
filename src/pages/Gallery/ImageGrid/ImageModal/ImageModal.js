import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useStoreContext } from '../../../../utils/GlobalState';
import styles from './ImageModal.module.scss';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

function ImageModal({ filteredImages, orientation, handleClose, vw }) {

    const [swipe, setSwipe] = useState({
        touchStart: null,
        touchEnd: null,
        moved: false
    })

    const [state, dispatch] = useStoreContext();

    console.log(window.navigator.userAgent)

    let statePhoto = state.photo;

    const [photo, setPhoto] = useState(statePhoto);

    const [currentIndex, setCurrentIndex] = useState(filteredImages.findIndex(index => index.img === statePhoto.img));

    const [isShown, setIsShown] = useState(false);

    // PHOTO ORIENTATION
    const [photoOrientation, setPhotoOrientation] = useState('');

    const [photoStyles, setPhotoStyles] = useState(``);

    // PHOTO INFORMATION
    const [information, setInformation] = useState('');

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
        visibility = information;
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

    const sensitivity = 150;

    const handleTouchStart = (e) => {
        let touchStartX = e.targetTouches[0].clientX;
        setSwipe({ ...swipe, touchStart: touchStartX });
    }

    const handleTouchMove = (e) => {
        let touchEndX = e.targetTouches[0].clientX;
        setSwipe({ ...swipe, touchEnd: touchEndX, moved: true });
    }

    const handleTouchEnd = (e) => {
        let amountSwiped = swipe.touchStart - swipe.touchEnd;
        let direction;
        if (amountSwiped > sensitivity && swipe.moved) {
            direction = 'left';
        } else if (amountSwiped < -sensitivity && swipe.moved) {
            direction = 'right';
        }
        // else {
        //     // setSwipe({ ...swipe, moved: false });
        // }

        changePhoto(e, direction);
    }


    // Cycle through photos in the filteredImages array
    // When forward and back arrows are clicked or image is swiped
    const changePhoto = (e, direction) => {
        if (direction === undefined && e._reactName === 'onTouchEnd') {

            setSwipe({ touchStart: null, touchEnd: null, moved: false });
            return;
        }

        let id;
        if (e._reactName === 'onTouchEnd') {
            console.log('SWIPING')
            if (direction === 'right') {
                id = 'back';
            } else if (direction === 'left') {
                id = 'forward';
            }
        } else {
            id = e.currentTarget.id;
        }
        // if it is forward - change photo to index + 1;  if back index -1

        if (id === 'forward') {
            currentIndex < filteredImages.length - 1 ? setCurrentIndex(currentIndex + 1) : setSwipe({ touchStart: null, touchEnd: null, moved: false });
        } else {
            currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setSwipe({ touchStart: null, touchEnd: null, moved: false });
        }

        setSwipe({ touchStart: null, touchEnd: null, moved: false });
    };

    // When currentIndex is changed - set the new photo
    useEffect(() => {
        setPhoto(filteredImages[currentIndex]);
    }, [currentIndex, filteredImages]);


    //SET DIFFERENT IMAGE STYLES BASED ON PHOTO ORIENTATION
    useEffect(() => {
        if (photoOrientation === 'portrait') {
            setPhotoStyles(`${styles.portrait}`);
            setInformation(`${styles.portraitInformation}`);
        } else {
            setPhotoStyles(`${styles.landscape}`);
            setInformation(`${styles.landscapeInformation}`);

        }
    }, [photoOrientation]);

    // CHECK THE DIMENSIONS OF THE IMAGE
    const onImgLoad = ({ target: img }) => {
        const { offsetHeight, offsetWidth } = img;
        if (offsetHeight > offsetWidth) {
            console.log('portrait')
            setPhotoOrientation('portrait');
        }
        else {
            setPhotoOrientation('landscape');
        }
    };

    return (
        <>
            <div
                className={styles.modalWrapper}
            >
                <button
                    className={styles.close}
                    onClick={() => handleClose()}
                >
                    <CloseIcon />
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

                    <button
                        className={mobile ? mobileBack : back}
                        onClick={(e) => {
                            changePhoto(e);
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.blur();
                        }}
                        id='back'
                    >
                        <ArrowBackIosNewIcon
                            fontSize='large'
                        />
                    </button>
                }
                <Box
                    sx={{
                        position: 'relative',
                        height: '95%',
                        width: { lg: '90%' },
                        // bgcolor: 'rgba(0, 0, 0, 0.5)',
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
                    <div
                        className={styles.imageWrapper}
                        onTouchStart={(e) => handleTouchStart(e)}
                        onTouchMove={(e) => handleTouchMove(e)}
                        onTouchEnd={(e) => handleTouchEnd(e)}
                    >
                        {/* For mobile landscape, show photo information on screen tap */}
                        {/* For desktop, show photo information on mouse enter or leave (HOVER) */}
                        {vw < 1000 ?
                            <img src={photo.img}
                                onLoad={onImgLoad}
                                className={photoStyles}
                                alt={`Title: ${photo.title}`}
                                onClick={() => !isShown ? setIsShown(true) : setIsShown(false)}
                            ></img>

                            :

                            <img src={photo.img}
                                onLoad={onImgLoad}
                                className={photoStyles}
                                alt={`Title: ${photo.title}`}
                                onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)}
                            ></img>
                        }
                    </div>

                    {/* Photo information */}
                    {/* <div
                        className={styles.dimensions}
                    > */}
                    <div
                        id='information'
                        className={`${visibility} ${information}`}
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
                            &#169; 2022, {`${photo.photographer}`}
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
                    {/* </div> */}
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

                    <button
                        className={mobile ? mobileForward : forward}
                        onClick={(e) => {
                            changePhoto(e)
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.blur();
                        }}
                        id='forward'
                    >
                        <ArrowForwardIosIcon
                            fontSize='large'
                        />
                    </button>
                }
            </div>
        </>
    )
};

export default ImageModal;
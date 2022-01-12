import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useStoreContext } from '../../../../utils/GlobalState';
import styles from './ImageModal.module.scss';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function ImageModal({ filteredImages }) {
    const [state, dispatch] = useStoreContext();

    let statePhoto = state.photo;

    const [photo, setPhoto] = useState(statePhoto);
    console.log(photo)

    // let currentIndex = filteredImages.findIndex(index => index.img === statePhoto.img)
    // console.log(currentIndex)
    const [currentIndex, setCurrentIndex] = useState(filteredImages.findIndex(index => index.img === statePhoto.img));

    const [isShown, setIsShown] = useState(false);


    // Setting the visibility of the photo info in modal - based on isShown local state
    let visibility;

    if (isShown) {
        visibility = styles.information;
    } else {
        visibility = styles.hidden;
    };


    // Cycle through photos in the filteredImages array
    // When forward and back arrows are clicked
    const changePhoto = (e) => {
        let id = e.currentTarget.id;
        console.log(id)

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
            <ArrowBackIosNewIcon
                id='back'
                onClick={(e) => {
                    changePhoto(e)
                }}
                fontSize='large'
                className={styles.back} />

            <img src={photo.img}
                className={styles.dimensions}
                alt={`Title: ${photo.title}`}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            ></img>

            <ArrowForwardIosIcon
                id='forward'
                onClick={(e) => {
                    changePhoto(e)
                }}
                fontSize='large'
                className={styles.forward} />

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
        </>
    )
};

export default ImageModal;
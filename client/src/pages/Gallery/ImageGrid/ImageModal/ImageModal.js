import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useStoreContext } from '../../../../utils/GlobalState';
import styles from './ImageModal.module.scss';


function ImageModal({ handleClose }) {
    const [state, dispatch] = useStoreContext();

    const { photo } = state;

    const [isShown, setIsShown] = useState(false);

    // Setting the visibility of the photo info in modal - based on isShown local state
    let visibility;

    if (isShown) {
        visibility = styles.information;
    } else {
        visibility = styles.hidden;
    }


    return (
        <>
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
        </>
    )
}

export default ImageModal;
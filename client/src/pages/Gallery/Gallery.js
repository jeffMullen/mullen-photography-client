import React from 'react';

import ImageGrid from './ImageGrid/ImageGrid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import styles from './Gallery.module.scss';

function Gallery() {

    return (
        <>
            <Box
                sx={{
                    marginTop: {
                        xs: '100px',
                        lg: '150px'
                    }
                }}
            >
                <Typography
                    variant='h4'
                    component='h2'
                    sx={{
                        textAlign: 'center',
                        marginBottom: {
                            xs: '50px',
                            lg: '100px'
                        }
                    }}>
                    Gallery
                    <span className={styles.underline}></span>
                </Typography>
                <Container>
                </Container>
                <Container>
                    <ImageGrid />
                </Container>
            </Box>
        </>
    )
};

export default Gallery;
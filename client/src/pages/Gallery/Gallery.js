import React from 'react';

import Categories from './Categories/Categories';
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
                        xs: '6rem',
                        lg: '9rem'
                    }
                }}
            >
                <Typography
                    variant='h4'
                    component='h2'
                    sx={{
                        textAlign: 'center',
                        marginBottom: {
                            xs: '1.5rem',
                            md: '3rem'
                        },
                        fontVariant: 'small-caps'
                    }}>
                    Gallery
                    <span className={styles.underline}></span>
                </Typography>
                <Container
                sx={{
                    marginBottom: {
                       md: '5rem'
                    }
                }}
                >
                    <Categories />
                </Container>
                <Container>
                    <ImageGrid />
                </Container>
            </Box>
        </>
    )
};

export default Gallery;
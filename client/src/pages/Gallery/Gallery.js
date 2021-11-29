import React from 'react';

import ImageGrid from './ImageGrid/ImageGrid';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Gallery() {

    return (
        <>
            <Box>
                <Container>
                    Gallery
                </Container>
                <Container>
                    <ImageGrid />
                </Container>
            </Box>
        </>
    )
};

export default Gallery;
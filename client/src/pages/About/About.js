import React from 'react';
import styles from './About.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Bio from './Bio/Bio';
import SelfPortrait from './SelfPortrait/SelfPortrait';

function About() {

    return (
        <>
            <Box
                sx={{
                    marginTop: {
                        xs: '6rem',
                        lg: '9rem'
                    },
                }}
            >
                {/* Page Heading */}
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
                    About
                </Typography>
                <Container
                    sx={{
                        margin: '3rem 0 4rem 0',
                        padding: '0'
                        // display: 'flex',
                    }}
                >
                    <Bio />
                    <SelfPortrait />
                </Container>
            </Box>
        </>
    )
};

export default About;
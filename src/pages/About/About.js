import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Bio from './Bio/Bio';
import SelfPortrait from './SelfPortrait/SelfPortrait';
import CreativeCommons from '../../components/CreativeCommons/CreativeCommons';

function About() {

    return (
        <>
            <Box
                sx={{
                    marginTop: {
                        xs: '6rem',
                        lg: '9rem'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                        margin: '3rem 0 0 0',
                        padding: '0',
                    }}
                >
                    <Bio />             {/* BIO OF PHOTOGRAPHER */}
                    <SelfPortrait />    {/* IMAGE OF PHOTOGRAPHER */}
                    <CreativeCommons /> {/* Creative Commons License */}
                </Container>

            </Box>
        </>
    )
};

export default About;
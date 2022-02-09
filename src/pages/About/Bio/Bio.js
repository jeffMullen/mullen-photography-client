import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Bio() {

    return (
        <>
            <Container
                sx={{
                    width: { lg: '50%' },
                    padding: '0 30px 0 30px'
                }}
            >
                <Typography
                    variant='h4'
                    component='h3'
                    sx={{
                        fontSize: '1.5rem',
                        fontVariant: 'small-caps',
                        marginBottom: '1.5rem'
                    }}
                >
                    Hi. I'm Jeff.
                </Typography>
                <Typography>
                    I am an amateur photographer.  I take most of my shots when travelling and experiencing intriguing natural wonders.  This gallery is a place to view some of those experiences from years past.
                </Typography>
            </Container>
        </>
    )
}

export default Bio;
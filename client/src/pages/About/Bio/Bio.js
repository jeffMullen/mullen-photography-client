import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Bio() {

    return (
        <>
            <Container
                sx={{
                    width: { md: '50%' },
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
                    Magna et ullamco deserunt pariatur laboris non tempor adipisicing non adipisicing elit.Voluptate tempor non mollit laboris et sunt est dolore.Do aute tempor sunt deserunt enim laboris nisi ad culpa et ullamco aute.Nulla proident tempor exercitation consectetur reprehenderit exercitation ullamco cillum minim sint nisi commodo aliquip.
                </Typography>
            </Container>
        </>
    )
}

export default Bio;
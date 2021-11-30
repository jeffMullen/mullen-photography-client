import React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

function Categories() {

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: {
                        xs: 'space-between',
                        sm: 'space-evenly'
                    }
                }}
            >
                {['All', 'Landscape', 'Urban', 'Abstract'].map(category =>
                    <Typography key={category}
                    variant='overline'
                    component='h3'
                    sx={{
                        fontSize: '1rem'
                    }}
                    >{category}</Typography>
                )}
            </Box>

        </>
    )
}

export default Categories;
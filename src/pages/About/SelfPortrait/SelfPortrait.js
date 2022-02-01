import React from 'react';
import Container from '@mui/material/Container';

import styles from './SelfPortrait.module.scss';
import portrait from '../../../mullen-photos/self-portrait.jpeg';


function SelfPortrait() {

    return (
        <>
            <Container
                sx={{
                    margin: '4rem 0 2rem 0',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: {
                        xs: '0',
                        sm: '0',
                        md: '0',
                        lg: '0',
                        xl: '0',
                },
                }}
            >
                <img
                    src={portrait}
                    alt='Self Portrait'
                    className={styles.portrait}
                ></img>
            </Container>
        </>
    )
}

export default SelfPortrait;
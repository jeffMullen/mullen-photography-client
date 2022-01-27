import React from 'react';
import Container from '@mui/material/Container';

import styles from './SelfPortrait.module.scss';
import portrait from '../../../mullen-photos/self-portrait.jpeg';


function SelfPortrait() {

    return (
        <>
            <Container
                sx={{
                    // width: '310px',
                    margin: '4rem 0 4rem 0',
                    overflow: 'hidden',
                    padding: '0',
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
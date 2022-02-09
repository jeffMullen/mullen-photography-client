import React from 'react';
import styles from './CreativeCommons.module.scss';

import Typography from '@mui/material/Typography';

function CreativeCommons() {

    return (
        <>
            <section
                className={styles.wrapper}
            >
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
                    <img
                        alt="Creative Commons License"
                        style={{ borderWidth: "0" }}
                        src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" />
                </a>
                <Typography>This work is licensed under a</Typography>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
                    Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License
                </a>.
            </section>
        </>
    )
}

export default CreativeCommons;
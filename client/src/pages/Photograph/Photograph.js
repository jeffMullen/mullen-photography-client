// import React, { useEffect } from 'react';
// import { useStoreContext } from '../../utils/GlobalState';
// import { CHANGE_SINGLE_PHOTO } from '../../utils/actions';
// import Paper from '@mui/material/Paper';
// import styles from './Photograph.module.scss';


function Photograph() {
    // const [state, dispatch] = useStoreContext();

    // useEffect(() => {
    //     dispatch({
    //         type: CHANGE_SINGLE_PHOTO,
    //         photo: JSON.parse(window.localStorage.getItem('photo')),
    //     })
    // }, []);

    // const { photo } = state;

    // console.log('Photograph', state);
    // console.log('state.photo', photo);

    return (
        <>
            {/* <Paper */}
                {/* sx={{
                    textAlign: 'center'
                }}
            > */}
                {/* <img src={photo.img}
                    className={styles.dimensions}
                ></img> */}
            {/* </Paper> */}
        </>
    )
}

export default Photograph;

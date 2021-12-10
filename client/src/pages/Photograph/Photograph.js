import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { CHANGE_SINGLE_PHOTO } from '../../utils/actions';

function Photograph() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        dispatch({
            type: CHANGE_SINGLE_PHOTO,
            photo: JSON.parse(window.localStorage.getItem('photo')),
        })
    }, []);

    const { photo } = state;

    console.log('Photograph', state);
    console.log('state.photo', photo);

    return (
        <>
            <h1>Single Photograph</h1>
        </>
    )
}

export default Photograph;

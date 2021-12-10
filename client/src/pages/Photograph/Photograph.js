import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';

function Photograph() {
    const [state, dispatch] = useStoreContext();

    console.log('Photograph', state);

    return (
        <>
            <h1>Single Photograph</h1>
        </>
    )
}

export default Photograph;

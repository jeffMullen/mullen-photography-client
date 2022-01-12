import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';

function SinglePhoto({ item, routeToPhoto }) {

    return (
        <ImageListItem
            data-photo={JSON.stringify(item)}
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
            onClick={(e) => {
                routeToPhoto(e)
            }}
        >
            <img
                src={`${item.img}?w=500&h=500&fit=crop&auto=format`}
                srcSet={`${item.img}?w=500&h=500&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
            />
        </ImageListItem>
    )
}

export default SinglePhoto;
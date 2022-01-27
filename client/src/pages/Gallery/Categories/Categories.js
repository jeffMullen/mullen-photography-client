import React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useStoreContext } from '../../../utils/GlobalState';
import { ADD_CATEGORY_FILTER } from '../../../utils/actions';
import styles from './Categories.module.scss';



function Categories() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;
    console.log('currentCategory', currentCategory)

    // Set the photo category filter
    const setCategoryFilter = (e) => {
        const data = e.target.textContent;

        // Set category in local storage
        window.localStorage.setItem('currentCategory', JSON.stringify(data));

        dispatch({
            type: ADD_CATEGORY_FILTER,
            currentCategory: JSON.parse(window.localStorage.getItem('currentCategory')),
        });
    }

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
                    category === currentCategory ?

                        // The Current Category gets the underline style to denote the current filter
                        <Typography key={category}
                            variant='overline'
                            component='h3'
                            className={styles.current}
                            sx={{
                                fontSize: '1rem',
                            }}
                            onClick={(e) =>
                                setCategoryFilter(e)}
                        >{category}</Typography>

                        :

                        // All other category filters have no underline text decoration
                        <Typography key={category}
                            variant='overline'
                            component='h3'
                            className={styles.category}
                            sx={{
                                fontSize: '1rem'
                            }}
                            onClick={(e) =>
                                setCategoryFilter(e)}
                        >{category}</Typography>
                )}
            </Box>

        </>
    )
}

export default Categories;
import { useReducer } from "react";
import {
    CHANGE_SINGLE_PHOTO,
    ADD_CATEGORY_FILTER,
} from './actions';

import images from '../mullen-photos/photographs';

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_SINGLE_PHOTO:
            return {
                ...state,
                photo: action.photo,
            };
        case ADD_CATEGORY_FILTER:
            return {
                ...state,
                currentCategory: action.currentCategory,
            };
        default:
            return state;
    }
}

export function usePhotoReducer(initialState) {
    return useReducer(reducer, initialState);
}
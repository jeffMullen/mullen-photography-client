import { useReducer } from "react";

export const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export function usePhotoReducer(initialState) {
    return useReducer(reducer, initialState);
}
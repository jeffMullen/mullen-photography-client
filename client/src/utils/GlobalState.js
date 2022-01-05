import React, { createContext, useContext } from "react";
import { usePhotoReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = usePhotoReducer({
        // photo: JSON.parse(window.localStorage.getItem('photo')),
        photo: {},
        currentCategory: 'All',
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

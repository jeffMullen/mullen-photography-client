import React, { createContext, useContext } from "react";
import { usePhotoReducer } from './reducers'

const StoreContext = createContext();
console.log(StoreContext);
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = usePhotoReducer({
        photo: [],
        currentCategory: '',
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

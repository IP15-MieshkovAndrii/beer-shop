import { createContext, useContext, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
    const getProducts = asu

    useEffect(() => {
        getProducts(API);
    },[])

    return <AppContext.Provider value="Andrii">{children}</AppContext.Provider>

};

const useProductContext = () => {
    return useContext(AppContext)
}

export {AppProvider, AppContext, useProductContext};

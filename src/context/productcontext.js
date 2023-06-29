import { createContext, useContext, useEffect, useReducer} from "react";
import { commerce } from "../lib/commerce";
import reducer from "../reducer/productReducer"

const AppContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    isSingleLoading: false,
    singleProduct: {}
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [products, setProducts] = useState([])
    
    const fetchProducts = async() => {
        dispatch({type:"SET_LOADING"})
        try {
            const {data} = await commerce.products.list();
            dispatch({type:"SET_API_DATA", payload: data})
        } catch {
            dispatch({type:"API_ERROR"})
        }
    };

    const getSingleProduct = async(id) => {
        dispatch({type:"SET_SINGLE_LOADING"})
        try {
            const {data} = await commerce.products.list();
            const singleProduct = data.find(product => product.id === id);
            dispatch({type:"SET_SINGLE_PRODUCT", payload: singleProduct});
        } catch (error) {
            dispatch({type:"SET_SINGLE_ERROR"})
        }
    }
    
    useEffect(() => {
        fetchProducts();
    },[])


    return(
        <AppContext.Provider value={{...state, getSingleProduct}}>
            {children}
        </AppContext.Provider>
    )

};

const useProductContext = () => {
    return useContext(AppContext)
}

export {AppProvider, AppContext, useProductContext};

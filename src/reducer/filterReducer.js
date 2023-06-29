const filterReducer = (state, action) => {
    switch(action.type){
        case"LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((curElem) => curElem.price.raw);

            let maxPrice = Math.max(...priceArr)
            if(maxPrice < 0) maxPrice=0;

            return {
                ...state,
                filterProducts: [...action.payload],
                allProducts: [...action.payload],
                filters: {...state.filters, maxPrice, price: maxPrice}
            }
        case"SET_GRID_VIEW":
            return {
                ...state,
                gridView: true,
            }
        case"SET_LIST_VIEW":
            return {
                ...state,
                gridView: false,
            }
        case"GET_SORT_VALUE":
            return {
                ...state,
                sortingValue: action.payload,
            }
        case "SORTING_PRODUCTS":
            let newSortData;
            const { filterProducts, sortingValue } = state;
            let tempSortProduct = [...filterProducts];

            const sortingProducts = (a, b) => {
                if (sortingValue === "lowest") {
                return a.price.raw - b.price.raw;
                }

                if (sortingValue === "highest") {
                return b.price.raw - a.price.raw;
                }

                if (sortingValue === "a-z") {
                return a.name.localeCompare(b.name);
                }

                if (sortingValue === "z-a") {
                return b.name.localeCompare(a.name);
                }
            };

            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filterProducts: newSortData,
            };
        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                ...state.filters,
                [name]: value,
                },
            };
        case "FILTER_PRODUCTS":
            let { allProducts } = state;
            let tempFilterProduct = [...allProducts];
        
            const {text, category, price} = state.filters;
        
            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                return curElem.name.toLowerCase().includes(text);
                });
            }
        
            if (category !== "все") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                return curElem.categories[0].name === category;
                });
            }

            if(price === 0){
                tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.price.raw === price);
            } else {
                tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.price.raw <= price);
            }

        
            return {
                ...state,
                filterProducts: tempFilterProduct,
            };
            case "CLEAR_FILTERS":
                return {
                    ...state,
                    filters: {
                    ...state.filters,
                    text: "",
                    category: "все",
                    company: "все",
                    color: "все",
                    maxPrice: state.filters.maxPrice,
                    price: state.filters.maxPrice,
                    minPrice: state.filters.minPrice,
                    },
                };
        default: return state;
    }
}

export default filterReducer;
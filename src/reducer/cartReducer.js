import { renderDefaultBeer } from "../functions/images";

const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, amount, product } = action.payload;


        let cartProduct;
        let beerI = "";
        if (product.image) {
          beerI = product.image.url;
        } else {
          beerI = renderDefaultBeer(product.categories);
        }
        const existingCartItemIndex = state.cart.findIndex(item => item.id === id);
        if (existingCartItemIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingCartItemIndex].amount += amount;
            if(updatedCart[existingCartItemIndex].amount > state.max) updatedCart[existingCartItemIndex].amount=state.max;
            return {
                ...state,
                cart: updatedCart,
            };
        } else {
            cartProduct = {
                id: id,
                name: product.name,
                amount,
                image: beerI,
                price: product.price.raw,
                max: 20,
            };
            return {
                ...state,
                cart: [...state.cart, cartProduct],
            };
        }
    }

    if (action.type === "SET_DECREMENT") {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;
  
          if (decAmount <= 1) {
            decAmount = 1;
          }
  
          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updatedProduct };
    }

    if (action.type === "SET_INCREMENT") {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1;
          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: incAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updatedProduct };
    }
  
    if (action.type === "REMOVE_ITEM") {
      let updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }

    if (action.type === "CLEAR_CART") {
      return {
        ...state,
        cart: [],
      };
    }

    if (action.type === "CART_ITEM_PRICE_TOTAL") {
      let { totalItem, totalPrice } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;
          accum.totalItem += amount;
          accum.totalPrice += price * amount;
          return accum;
        },
        {
          totalItem: 0,
          totalPrice: 0,
        }
      );
      return {
        ...state,
        totalItem,
        totalPrice,
      };
    }
  
    return state;
  };
  
  export default cartReducer;
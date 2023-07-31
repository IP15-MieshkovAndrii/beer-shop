import { createContext, useContext, useReducer } from "react";
import checkoutReducer from "../reducer/checkoutReducer";

const CheckoutContext = createContext();

const initialState = {
  // initial checkout state
  shippingAddress: "",
  paymentMethod: "",
  // other properties related to checkout
};

const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  // actions related to checkout
  const setShippingAddress = (address) => {
    dispatch({ type: "SET_SHIPPING_ADDRESS", payload: address });
  };

  const setPaymentMethod = (method) => {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method });
  };

  // other actions and effects related to checkout

  return (
    <CheckoutContext.Provider value={{ ...state, setShippingAddress, setPaymentMethod }}>
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

export { CheckoutProvider, useCheckoutContext };

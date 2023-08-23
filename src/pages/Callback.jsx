
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";


const Callback = () => {
  const {clearCart} = useCartContext();
  const navigate = useNavigate();
  clearCart();
  navigate('/')
  return(
    <></>
  )
  
};

export default Callback;
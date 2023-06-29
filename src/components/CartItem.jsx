import React from "react";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cartContext";


const CartItem = ({ id, name, image, price, amount }) => {
  const { removeItem, setDecrease, setIncrease } = useCartContext();

  return (
    <div className="cart-heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name} {0.5*amount}л</p>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          ₴{price}
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrease(id)}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
            ₴{price * amount}
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};



export default CartItem;
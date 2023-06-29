import { useState } from "react";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cartContext";

const AddToCart = ({ updateQuantity, product }) => {
  const {addToCart} = useCartContext();
  const {id} = product;

  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
    amount > 1 ? updateQuantity(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < 20 ? setAmount(amount + 1) : setAmount(20);
    amount < 20 ? updateQuantity(amount + 1) : setAmount(20);
  };

  return (
    <Wrapper>
      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart" onClick={() => addToCart(id, amount, product)}>
        <Button className="btn">Додати до кошика</Button>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`
    color: white;

  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: ${({ theme }) => theme.colors.bgS};
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: rgb(140, 154, 249);
    }
  }
`;
export default AddToCart;
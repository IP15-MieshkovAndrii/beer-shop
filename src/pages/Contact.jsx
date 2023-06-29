/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { BsInstagram } from "react-icons/bs";

const Contact = () => {

  const url = "https://www.instagram.com/vy_beer/";
  const handleButtonClick = () => {
    window.location.href = url;
  };
  return (
    <Wrapper>
      <h2 className="common-heading">Контакти</h2>
      <div className="instagram">
        <div>
          <div>
            <BsInstagram className="icon" />
            <h3>Наш інстаграм</h3>
          </div>
            <Button onClick={handleButtonClick}>Перейти</Button>
        </div>
      </div>


      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465.77828649833685!2d30.43112936888593!3d50.43588064659752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc1cb5eaacdd%3A0xc801547917de08fc!2z0LLRg9C70LjRhtGPINCc0LjRhdCw0LnQu9CwINCU0L7QvdGG0Y8sIDLQkCwg0JrQuNGX0LIsINCj0LrRgNCw0ZfQvdCwLCAwMzA2MQ!5e0!3m2!1suk!2spl!4v1687364647978!5m2!1suk!2spl"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
    </Wrapper>
  )
};

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;
  .instagram {
    width: auto;
    height: 10rem;
    margin: 5%;
    display: flex;
    flex-direction: column;
    color: #fff;
    justify-content: center;
    align-content: center;
    ${'' /* background: ${({ theme }) => theme.colors.bg}; */}
    background: rgba(255,255,255,0.1);
    text-align: center;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        ${'' /* gap: 1rem; */}

        div {
          gap:1.5rem;
        }
        }
  }

  h3 {
    font-size: 3rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  .icon {
    /* font-size: rem; */
    width: 6rem;
    height: 6rem;


    color: #c49952;
    }


`;

export default Contact;

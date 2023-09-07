/* eslint-disable no-useless-escape */
import React, { useRef, useState} from "react";
import styled from "styled-components";
import { Form, Button } from 'semantic-ui-react';
import 'react-phone-input-2/lib/style.css';
// import 'semantic-ui-css/semantic.min.css'
import PhoneInput from 'react-phone-input-2';
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import {LiqPay} from "../payment/liqpay";
import { commerce } from "../lib/commerce";

const payment = new LiqPay('sandbox_i3877493362', 'sandbox_cz5z0KfADUcCRcRpYNpbToMcXMkDbAZDs4Fvg2Nh')


const Cheakout = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm()
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const {cart, totalPrice} = useCartContext();
    if(cart.length === 0)navigate('/cart');
    const [newData, setNewData] = useState(0);
    const [newForm, setNewFrom] = useState(0);

    const addItemsToCart = async (items) => {
        try {
            await commerce.cart.empty();
            for (const cartItem of items) {
                await commerce.cart.add(cartItem.id, cartItem.amount)
            }
        } catch (error) {
            console.error(`Error adding items to the cart: ${error.message}`);
        }
    };
    
    const createOrder = async (customerData, shippingData) => {
        try {
            const cartId = commerce.cart.id();
            
            const token = await commerce.checkout.generateToken(cartId, { type: 'cart' });
            
            const order = await commerce.checkout.capture(token.id, {
                customer: {
                    firstname: customerData.firstname,
                    lastname: customerData.lastname,
                    email: customerData.email,
                    phone: customerData.numberPhone
                },
                shipping: {
                    street: shippingData.street + ", будинок " + shippingData.house + ', квартира ' + shippingData.apartment,
                },
                "billing": [],
                payment: {
                    gateway: 'test_gateway',
                    card: {
                        number: '4242424242424242',
                        expiry_month: '02',
                        expiry_year: '24',
                        cvc: '123',
                        postal_zip_code: '94107',
                    }
                },
            });
            console.log('Order created successfully:', order);
        } catch (error) {
            console.error('Error creating order:', error.message);
        }
    };

    const onSubmit = (data) => {
        const callbackurl = window.location.origin + '/callback';
        const itemsCart = cart.map((item)=>({
            quantity: item.amount,
            price: item.price,
            cost: item.amount * item.price,
            id: item.id,
            name: item.name,
        }))
        const paymentData = {
            language: 'en',
            amount: totalPrice,
            currency: 'UAH',
            description: 'Bear payment',
            rro_info: {
                items: itemsCart
            },
            action: 'pay',
            version: '3',
            order_id: Math.random()*999,
            public_key:'sandbox_i3877493362',
            result_url: callbackurl,
        }

        addItemsToCart(cart);
        createOrder(data, data);
        setNewData(paymentData)
        setNewFrom(payment.cnb_form(paymentData))



    }
    const returnToCart = () => {
        navigate('/cart');
    }


    return (
        <Wrapper>
            <Form className='checkout-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Ваші контактні дані</h1>
                <Form.Group className='form-group' >

                    <Form.Field className="form-half">
                        <label>Прізвище</label>
                        <input
                            placeholder='Шевченко'
                            type="text"
                            {...register("lastname", {required: true, maxLength: 20})}
                        />
                        {errors.lastname && 
                            <p className="ui negative mini message">Прізвище є обов’язковим і має містити менше 20 символів</p>
                        }
                    </Form.Field>
                    <Form.Field className="form-half">
                        <label>Імʼя</label>
                        <input
                            placeholder='Микола'
                            type="text"
                            {...register("firstname", {required: true, maxLength: 20})}
                        />
                        {errors.firstname && 
                            <p className="ui negative mini message">Ім’я є обов’язковим і має містити менше 20 символів</p>
                        }
                    </Form.Field>
                </Form.Group>
                <Form.Group className='form-group' widths='equal'>
                    <Form.Field className="form-half">
                        <label>Email</label>
                        <input
                            placeholder='xyz@example.com'
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })}
                        />
                        {errors.email && 
                            <p className="ui negative mini message">Введіть дійсну адресу електронної пошти</p>
                        }
                    </Form.Field>
                    <Form.Field className="form-half">
                        <label>Телефон</label>
                        <Controller 
                            control={control}
                            name="phone"
                            render={({ field }) => (
                                <PhoneInput
                                    {...field}
                                    innerRef={inputRef}
                                    country={'ua'}
                                    enableAreaCodes={true}
                                    placeholder='Введіть номер телефону'
                                    inputStyle={{ width: '100%' }}
                                    inputProps={{
                                    autoComplete: 'off', 
                                    }}
                                />
                            )}
                            {...register("numberPhone", {required: true, minLength: 10, maxLength: 20})}
                        />
                        {errors.numberPhone && (
                            <p className="ui negative mini message">Це обов’язкове поле</p>
                        )}
                    </Form.Field>
                </Form.Group>
                <h1>Доставка</h1>
                <Form.Group className='form-group' >
                    <Form.Field className="form-half">
                        <label>Вулиця</label>
                        <input
                            placeholder='Борщагівська'
                            type="text"
                            {...register("street", {required: true, maxLength: 40})}
                        />
                        {errors.street && 
                            <p className="ui negative mini message">Це обов’язкове поле і має містити менше 40 символів</p>
                        }
                    </Form.Field>
                    <Form.Field className="form-half-half">
                        <label>Будинок</label>
                        <input
                            placeholder='123'
                            type="text"
                            {...register("house", {required: true})}
                        />
                        {errors.house && 
                            <p className="ui negative mini message">Це обов’язкове поле</p>
                        }
                    </Form.Field>
                    <Form.Field className="form-half-half">
                        <label>Квартира</label>
                        <input
                            placeholder='23'
                            type="text"
                            {...register("apartment", {required: false})}
                        />
                    </Form.Field>
                </Form.Group>
                <Button className="submitButton" disabled={newData!==0} type='submit'>Підтвердити платіж</Button>
            </Form>
            <div className='cartItems'>
                <div className="title">
                    <h3>Поточний кошик</h3>
                </div>
                <div className="cart">
                    <div className="cartReturn" onClick={returnToCart}>Повернутись до кошика</div>
                    <div className="items">
                    {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div className="items-data">
                            <h4>{item.name}</h4>
                            <p>{item.amount * 0.5}л</p>
                        </div>
                        <div className="price">
                            {item.price * item.amount}₴
                        </div>
                    </div>
                    ))}
                    </div>
                    <div className="items-amount">
                        <h4>Кінцева Вартість</h4>
                        {totalPrice}₴
                    </div>
                </div>
                <div className="total"></div>
                <div className="paymentButton" style={{ display: !newData ? 'none' : 'block' }}>
                    {newData ? <div dangerouslySetInnerHTML={{ __html: newForm }}/> : ''}
                </div> 
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.section`
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: flex-start;
    .paymentButton{
        position:relative;
        input[type="image"]{
            z-index: 20;
        }
    }
    .checkout-form {
        position: relative;
        background-color: #ffffff;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        width: 60%;
        margin: 5rem 10rem;
        gap: 2rem;

        h1{
            color: #000;
            font-size: 2.5rem;
        }
        .form-group {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 1rem;
            .form-half{
                width:50%
            }
            .form-half-half{
                width:25%
            }
            input {
                width: 100%;
                height: 4.5rem;
            }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }



        }

        .ui.negative.mini.message {
            background-color: #e74c3c; /* Red background color */
            color: white; /* Text color */
            padding: 8px; /* Padding around the message content */
            border-radius: 4px; /* Rounded corners */
            font-size: 12px; /* Font size */
            text-align: center; /* Center-align the text */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: Add a subtle box shadow */
            }

        .submitButton{
            width: 30%;
            background-color: rgb(40, 249, 127);
            border: none;
            color: black;
            cursor:pointer;
            padding: 0% 2%;
            border: 2px solid black;
            :hover, :active{
                background-color: rgba(24, 169, 85, 0.766);
            }
        }
        .cartItems{
            position: fixed;
            right:0%;
            padding: 2rem;
            width:25%;
            background-color:white;
            margin: 2rem 5rem 2rem 0rem;
            min-height: 10%;
            text-align:center;
            border: 1px solid black;
            .title{
                text-align:center;
                margin: 0 0 2rem 0;
                border-bottom: 1px solid grey;
                h3{
                    font-weight: 700;
                    font-size: 20px;
                }
            }
            .cart{
                color: black;
                margin: 0 0 2rem 0;

                .cartReturn{
                    font-size: 12px;
                    color:rgb(13, 63, 128);
                    z-index: 5;
                    cursor:pointer;
                    margin: 0 0 2rem 0;
                }
                .items{
                    width:100%;
                    display:flex;
                    flex-direction:column;
                    border-bottom: 1px solid grey;
                    .cart-item{
                        width:100%;
                        display:flex;
                        flex-direction:row;
                        justify-content:space-between;
                        .items-data{
                            display:flex;
                            flex-direction:column;
                            text-align:left;
                            h4{
                                color: red;
                                font-size: 11px;
                            }
                            p{
                                color: grey;
                                font-size: 9px;
                            }
                        }
                        .price{
                            font-size: 13px;
                        }
                    }
                }
                .items-amount{
                    font-size: 15px;
                    padding:1rem;
                    padding-bottom:0;
                }
            }
            
        }

  `


export default Cheakout;
/* eslint-disable no-useless-escape */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Form, Button } from 'semantic-ui-react';
import 'react-phone-input-2/lib/style.css';
// import 'semantic-ui-css/semantic.min.css'
import PhoneInput from 'react-phone-input-2';
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form'
import { commerce } from "../lib/commerce";

// const PhoneInputWrapper = ({ field}) => {
//     return (
//       <PhoneInput
//         {...field}
//         country={'ua'}
//         enableAreaCodes={true}
//         placeholder='Введіть номер телефону'
//         inputStyle={{ width: '100%' }}
//         inputProps={{
//           autoComplete: 'off', 
//         }}
//       />
//     );
//   }

const Cheakout = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm()
    const inputRef = useRef(null);
    
    const onSubmit = (data) => {
        console.log(data)
    }



    return (
        <Wrapper>
            <Form className='checkout-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Ваші контактні дані</h1>
                <Form.Group className='form-group' >
                    {/* <Form.Input
                        className="form-half"
                        label='Прізвище'
                        placeholder='ШЕВЧЕНКО'
                        {...register("lastname", {required: true, maxLength: 20})}
                    /> */}

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
                    {/* <Form.Field className="form-half">
                        <label>Телефон</label>
                        <PhoneInput
                            country={'ua'}
                            enableAreaCodes={true}
                            placeholder='Введіть номер телефону'
                            inputStyle={{ width: '100%' }}
                            inputProps={{
                                autoComplete: 'off', 
                            }}
                            onChange={(value) => {
                                if (value.length>11)setPhoneNumber(value)
                                else setPhoneNumber('zero')
                            }}
                            {...register("numberPhone", {required: false})}
                        />
                        {phoneNumber === 'zero' && (
                            <p className="ui negative mini message">Це обов’язкове поле</p>
                        )}
                    </Form.Field> */}
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
                <h1>Оплата</h1>
                <Form.Group className="payment-radio">
                    <input
                        name='gateway' 
                        type='radio'
                        value='test_gateway'
                        {...register("payment", { required: true })}
                    />
                    <label htmlFor="test_gateway">Test Gateway</label>
                    <input
                        name='gateway' 
                        type='radio'
                        value='stripe'
                        defaultChecked="true"
                        {...register("payment", { required: true })}
                    />
                    <label htmlFor="stripe">Кредитна картка</label>
                </Form.Group>
                <Form.Group className='form-group payment'>
                    <Form.Field className="form-half">
                        <label>Номер кредитної карти</label>
                        <input
                            id="ccn"
                            type="tel"
                            inputMode="numeric" 
                            pattern="[0-9\s]{13,19}" 
                            autoComplete="cc-number" 
                            maxLength="16" 
                            placeholder="0000111100001111"
                            {...register("number", {required: true, minLength: 16})}
                        />
                        {errors.number && 
                            <p className="ui negative mini message">Введіть коректний номер карти</p>
                        }
                    </Form.Field>
                    {/* <Form.Input
                        width={5}
                        className="form-half"
                        name='postal_billing_zip_code' 
                        type='number'
                        max='99999'
                        label='Billing Zip' 
                        placeholder='Введіть Zip code'
                    /> */}
                </Form.Group>
                <Form.Group className='form-group payment'>
                    <Form.Field className="form-half-half">
                        <label>ММ</label>
                        <input
                            type="text"
                            pattern="^(0[1-9]|1[0-2])$"
                            maxLength="2" 
                            placeholder="09"
                            {...register("month", {required: true, minLength: 2})}
                        />
                        {errors.month && 
                            <p className="ui negative mini message">Введіть коректне число</p>
                        }
                    </Form.Field>
                    <Form.Field className="form-half-half">
                        <label>РР</label>
                        <input
                            type="text"
                            pattern="[0-9]{2}" 
                            maxLength="2" 
                            placeholder="23"
                            {...register("year", {required: true, minLength: 2})}
                        />
                        {errors.year && 
                            <p className="ui negative mini message">Введіть коректне число</p>
                        }
                    </Form.Field>
                    <Form.Field className="form-third">
                        <label>CVC</label>
                        <input
                            type="text"
                            pattern="[0-9]{3}" 
                            maxLength="3" 
                            placeholder="123"
                            {...register("cvc", {required: true, minLength: 3})}
                        />
                        {errors.cvc && 
                            <p className="ui negative mini message">Введіть коректне число</p>
                        }
                    </Form.Field>
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>

        </Wrapper>
    )
}

const Wrapper = styled.section`
  .checkout-form {
    background-color: #ffffff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    margin: 5rem 20rem;
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

    .payment{
        justify-content: space-between;
        width:50%;
        gap: 1rem;

        .form-third{
            width:33%;
        }
    }

    .payment-radio {
        align-items: center;
        margin-left: 0px !important;

        label {
            margin-right: 10px;
        }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="radio"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #999;
        transition: border-color 0.2s ease-in-out;
        margin-right: 5px;
        padding:0;

    }

    input[type="radio"]:checked {
        border-color: #000;
        background-color: blue;
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

  


  `


export default Cheakout;
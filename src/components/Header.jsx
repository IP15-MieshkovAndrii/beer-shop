import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import "./stars.scss"

const Header = () => {
    return (
        <MainHeader>
            <NavLink to="/">
                <img className="logo" src="./images/logo.png" alt="wybeer logo"/>
            </NavLink>
            <div className="bg-animation">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div id="stars4"></div>
            </div>
            <Nav/>
        </MainHeader>
    )
}

const MainHeader = styled.header`
    padding: 0 4.8rem;
    height: 8rem;
    background-color: ${({theme}) => theme.colors.bg };
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .logo {
        height: 6rem;
    }

`;

export default Header;
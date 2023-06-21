import React from "react";
import styled from "styled-components";
import { FaInstagram } from "react-icons/fa";

import "./stars.scss"

const Footer = () => {
    return (
        <>
        <Wrapper>
  
          <footer>
            <div className="container grid grid-two-column">
              <div className="footer-about">
                <h3>ВИbeer</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
              </div>
              <div className="footer-social">
                <h3>Слідкуй за нами</h3>
                <div className="footer-social--icons">
                  <div>
                    <a
                      href="https://www.instagram.com/vy_beer/"
                      target="_blank" rel="noreferrer">
                      <FaInstagram className="icons" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="footer-bottom--section">
              <hr />
              <div className="container grid grid-two-column ">
                <p>
                  @{new Date().getFullYear()} ВИBeer. Всі права захищені
                </p>
                <div>
                  <p>PRIVACY POLICY</p>
                  <p>TERMS & CONDITIONS</p>
                </div>
              </div>
            </div>
          </footer>
        </Wrapper>
      </>
    );
  };
  
  const Wrapper = styled.section`
    footer {
      padding: 4rem 0 4rem 0;
      background-color: ${({ theme }) => theme.colors.footer_bg};
      h3 {
        color: ${({ theme }) => theme.colors.hr};
        margin-bottom: 2.4rem;
      }
      p {
        color: ${({ theme }) => theme.colors.white};
      }

      .footer-social--icons {
        display: flex;
        gap: 2rem;
  
        div {
          padding: 1rem;
          border-radius: 50%;
          border: 2px solid ${({ theme }) => theme.colors.white};
  
          .icons {
            color: ${({ theme }) => theme.colors.white};
            font-size: 2.4rem;
            position: relative;
            cursor: pointer;
          }
        }
      }
    }
  
    .footer-bottom--section {
      padding-top: 9rem;
  
      hr {
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.colors.hr};
        height: 0.1px;
      }
    }
  
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
  
      footer {
        padding: 9rem 0 9rem 0;
      }
  
      .footer-bottom--section {
        padding-top: 4.8rem;
      }
    }
  `;


export default Footer;
import React from "react";
import styled from "styled-components";
import { TbTruckDelivery } from "react-icons/tb";
import { GiUfo } from "react-icons/gi";
import { IoMdBeer } from "react-icons/io";
import { RiSecurePaymentLine } from "react-icons/ri";
// import styled from "styled-components";

const Services = () => {

    return (
        <Wrapper>
          <div className="container">
            <div className="grid grid-three-column">
              <div className="services-1">
                <div>
                  <TbTruckDelivery className="icon" />
                  <h3>Доставка з космічною швидкістю</h3>
                </div>
              </div>

              <div className="services-2">
                <div className="services-colum-2">
                  <div>
                    <GiUfo className="icon" />
                    <h3>Тематичні вечори</h3>
                  </div>
                </div>
                <div className="services-colum-2">
                  <div>
                    <IoMdBeer className="icon" />
                    <h3>Різноманітні напої</h3>
                  </div>
                </div>
              </div>

              <div className="services-3">
                <div>
                  <RiSecurePaymentLine className="icon" />
                  <h3>Надбезпечна платіжна система</h3>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding: 7rem 0;

    .grid {
    gap: 4.8rem;
    }

    .services-1,
    .services-2,
    .services-3 {
    width: auto;
    height: 30rem;
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
    }

    .services-2 {
    gap: 4rem;
    background-color: transparent;
    box-shadow: none;

    .services-colum-2 {
        ${'' /* background: ${({ theme }) => theme.colors.bg}; */}
        background: rgba(255,255,255,0.1);
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        align-items: center;
        border-radius: 2rem;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

        div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        }
    }
    }

    h3 {
    margin-top: 1.4rem;
    font-size: 2rem;
    }

    .icon {
    /* font-size: rem; */
    width: 8rem;
    height: 8rem;
    padding: 2rem;
    border-radius: 50%;
    background-color:${({ theme }) => theme.colors.bg};
    color: #c49952;
}
`; 


export default Services;
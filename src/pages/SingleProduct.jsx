import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProductContext } from "../context/productContext";
import PageNavigation from "../components/PageNavigation";
import { Container } from "../styles/Container";
import MyImage from "../components/MyImage";
import AddToCart from "../components/AddToCart";
import { renderDefaultBeer } from "../functions/images";
// import MyImage from "./components/MyImage";


const SingleProduct = () => {
  const {getSingleProduct, isSingleLoading, singleProduct} = useProductContext();
  const {id} = useParams();
  const [quantity, setQuantity] = useState(0.5);
  const [priceB, setPriceB] = useState(0);

  const updateQuantity = (newAmount) => {
    let newQuantity = 0.5 * newAmount;
    let newPriceB = uah*newAmount;
    setPriceB(newPriceB)
    setQuantity(newQuantity);
  };

  const {
    name,
    price,
    description,
    categories,
    image
  } = singleProduct;
  

  useEffect(() => {
    getSingleProduct(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  };

  let uah = "";
  if(price)uah = price.raw
  

  let defBeer = "";
  let beerI = "";
  if(image)beerI = image.url;

  if(categories){
    defBeer = renderDefaultBeer(categories);
  };


  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
          <div className="product-images">
            <MyImage imgs={beerI || defBeer} />
            {/* <img 
                src="./images/beer.jpeg"
                alt="produc-section" 
                /> */}
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{name} {quantity}л</h2>
            <p className="product-data-price">
            ₴{priceB || uah}
            </p>

            <div className="product-data-info">
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            <hr/>
            <AddToCart updateQuantity={updateQuantity} product={singleProduct}/>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-price {
      font-weight: bold;
      font-size: 3rem;
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { renderDefaultBeer } from "../functions/images";

const ListView = ({ products }) => {

  return (
    <Wrapper className="section">
      <div className="container grid">
        {products.map((curElem) => {
          const { id, name, image, price, description, categories } = curElem;
            let truncatedDescription = description.slice(0, 90) + "..."
            let defBeer = "";
            let beer = ""
            if(image)beer = image.url;
            defBeer = renderDefaultBeer(categories);
          return (
            <div key= {id} className="card grid grid-two-column">
              <figure>
                <img src={beer || defBeer} alt={name} />
              </figure>

              <div className="card-data">
                <h3>{name}</h3>
                <p>
                  {price.formatted_with_symbol}
                </p>
                <p dangerouslySetInnerHTML={{ __html: truncatedDescription }}></p>

                <NavLink to={`/singleproduct/${id}`} className="btn-main">
                  <Button className="btn">Показати більше</Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;


  .container {
    max-width: 120rem;

  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }

  .card {
    border: 0.1rem solid rgb(170 170 170 / 40%);
    background-color: ${({ theme }) => theme.colors.bg};

    .card-data {
      padding: 0 2rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      text-transform: capitalize;
      color: rgba(196,153,82, 1);
    }

    .btn {
      margin: 2rem 0;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgba(196,153,82, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(196,153,82, 1);

      &:hover {
        background-color: rgba(196,153,82, 1);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgba(196,153,82, 1);
        font-size: 1.4rem;
      }
    }

    .btn-main .btn:hover {
      color: #fff;
    }
  }
`;

export default ListView;
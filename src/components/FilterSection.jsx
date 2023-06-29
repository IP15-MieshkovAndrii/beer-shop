import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filterContext";
import { getCategory } from "../functions/filter";
import { Button } from "../styles/Button";

const FilterSection = () => {
    const {
        filters: {text, category, price, maxPrice, minPrice}, 
        updateFilterValue,
        allProducts,
        clearFilters
    } = useFilterContext();

    const categoryData = getCategory(allProducts);

    return (
        <Wrapper>
            <div className="filter-search">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input 
                    type="text" 
                    name="text" 
                    value={text} 
                    placeholder="ПОШУК"
                    onChange={updateFilterValue}
                    />
                </form>
            </div>

            <div className="filter-category">
                <h3>Категорії</h3>
                <div>
                {categoryData.map((curElem, index) => {
                    return (
                    <button
                        key={index}
                        type="button"
                        name="category"
                        value={curElem}
                        className={curElem === category ? "active" : ""}
                        onClick={updateFilterValue}>
                        {curElem}
                    </button>
                    );
                })}
                </div>
            </div>

            <div className="filter_price">
                <h3>Ціна</h3>
                <p>
                ₴{price}
                </p>
                <input
                type="range"
                name="price"
                min={minPrice}
                max={Math.ceil(maxPrice)}
                value={price}
                onChange={updateFilterValue}
                />
            </div>

            <div className="filter-clear">
                <Button className="btn" onClick={clearFilters}>
                Очистити Фільтри
                </Button>
            </div>
            
        </Wrapper>
    )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    background: linear-gradient(to right, #fff, yellow);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(196,153,82, 0.5);
    
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.bgS};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.helper};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input[type=range] {
    height: 0;
    margin: 0.5rem 0 1rem 0;
    padding: 0;
    box-shadow: none;
    background: #969632;     
    cursor: pointer;
    -webkit-appearance: none;
    margin: 0.5rem 0 1rem 0;
    width: 90%;
    }
    input[type=range]:focus {
    outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #002200;
    background: #DED51B;
    border-radius: 16px;
    border: 1px solid #D5CF26;
    }
    input[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #AAA520;
    border: 2px solid #E5E532;
    height: 15px;
    width: 15px;
    margin-top: -5.5px;
    border-radius: 23px;
    background: #969632;
    cursor: pointer;
    -webkit-appearance: none;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
    background: #DED51B;
    }
    input[type=range]::-moz-range-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #002200;
    background: #DED51B;
    border-radius: 16px;
    border: 1px solid #D5CF26;
    }
    input[type=range]::-moz-range-thumb {
    box-shadow: 3px 3px 3px #AAA520;
    border: 2px solid #E5E532;
    height: 15px;
    width: 15px;
    border-radius: 23px;
    background: #969632;
    cursor: pointer;
    }
    input[type=range]::-ms-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
    }
    input[type=range]::-ms-fill-lower {
    background: #DED51B;
    border: 1px solid #D5CF26;
    border-radius: 32px;
    box-shadow: 1px 1px 1px #002200;
    }
    input[type=range]::-ms-fill-upper {
    background: #DED51B;
    border: 1px solid #D5CF26;
    border-radius: 32px;
    box-shadow: 1px 1px 1px #002200;
    }
    input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 3px 3px 3px #AAA520;
    border: 2px solid #E5E532;
    height: 15px;
    width: 15px;
    border-radius: 23px;
    background: #969632;
    cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
    background: #DED51B;
    }
    input[type=range]:focus::-ms-fill-upper {
    background: #DED51B;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    font-size:1.3rem;
    color: #000;
  }
`;

export default FilterSection;
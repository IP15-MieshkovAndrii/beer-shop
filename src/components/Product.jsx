import React from "react";
import { NavLink } from "react-router-dom"; 
import { renderDefaultBeer } from "../functions/images";

const Product = (curElem) => {
  const { id, name, image, price, categories } = curElem;
  let defBeer = "";
  let beer = ""
  if(image)beer = image.url;
  defBeer = renderDefaultBeer(categories);
  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
          <img src={beer || defBeer} alt={name} />
          <figcaption className="caption">{categories[0].name}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">{price.formatted_with_symbol}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
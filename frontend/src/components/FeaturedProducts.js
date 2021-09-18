import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../data";

const FeaturedProducts = () => {
  const [featureProducts, setFeatureProducts] = useState([]);

  useEffect(() => {
    // fetch from API later
    const feature = [];
    const randRange = products.length;
    while (feature.length < 3) {
      let random = Math.floor(Math.random() * randRange) + 1;
      if (!feature.includes(random)) {
        feature.push(random);
      }
    }
    setFeatureProducts(
      products.filter((product) => feature.includes(product.productId))
    );
  }, []);
  return (
    <div className='row feature-product'>
      {featureProducts.map((product) => (
        <div className='col-lg-4' key={product.productId}>
          <img
            src={`../images/products-img/${product.productImage}`}
            width='140'
            height='140'
            alt=''
          />

          <h2>{product.title}</h2>
          <p>{product.content}</p>
          <p>
            <Link
              className='btn btn-primary'
              to={`/products/${product.productId}`}
            >
              View details &raquo;
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;

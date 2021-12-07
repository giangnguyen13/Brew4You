import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { END_POINTS } from "../services/api/endpoints";
import { api } from "../services/api/config";
import { user_config } from "../config/auth";

const FeaturedProducts = () => {
  const [featureProducts, setFeatureProducts] = useState([]);

  const getProducts = async () => {
    await api
      .get(END_POINTS.GET_RECOMMENDED_PRODUCTS, user_config)
      .then((response) => {
        const products = response?.data?.products;
        setFeatureProducts(products);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className='row feature-product'>
      <h1 className='text-center mb-5'>Recommended for you</h1>
      {featureProducts.map((product) => (
        <div className='col-lg-4' key={product._id}>
          <img src={`${product.image}`} width='140' height='140' alt='' />

          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <Link className='btn btn-primary' to={`/products/${product._id}`}>
              View details &raquo;
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;

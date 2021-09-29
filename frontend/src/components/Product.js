import React, { useState, useEffect } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { productId, title, price, productImage } = product;

  return (
    <div className='col'>
      <div className='card shadow-sm'>
        <Link to={`/products/${productId}`} className='product-list-link'>
          <div className='product-list-image'>
            <img src={`../images/products-img/${productImage}`} alt={title} />
            <div className='middle'>
              <div className='text'>
                <i className='fas fa-search'></i>
              </div>
            </div>
          </div>
        </Link>
        <div className='card-body'>
          <Link to={`/products/${productId}`} className='product-list-link'>
            <h6 className='text-center'>{title}</h6>
          </Link>
          <Rating rating={2.5} />
          <b style={{ fontSize: "18px" }}>${price}</b>
          <div className='d-flex justify-content-center mt-1'>
            <button
              id='addToWishListBtn'
              type='button'
              className='btn btn-primary'
            >
              <i className='fas fa-heart'></i> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

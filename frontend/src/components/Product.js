import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { productId, title, price, productImage } = product;

  const addToCartHandler = (e) => {
    e.preventDefault();
    console.log(`add product #${productId} to cart action`);
  };
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
              id='addToCartBtn'
              type='button'
              className='btn btn-primary'
              onClick={addToCartHandler}
            >
              <i className='fas fa-shopping-cart'></i> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

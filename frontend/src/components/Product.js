import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product, isWishList, onClick, style }) => {
  const { _id, title, price, image } = product;

  return (
    <div className='col' style={style || {}}>
      <div className='card shadow-sm'>
        <Link to={`/products/${_id}`} className='product-list-link'>
          <div className='product-list-image'>
            <img src={image} alt={title} />
            <div className='middle'>
              <div className='text'>
                <i className='fas fa-search'></i>
              </div>
            </div>
          </div>
        </Link>
        <div className='card-body'>
          <Link to={`/products/${_id}`} className='product-list-link'>
            <h6 className='text-center'>{title}</h6>
          </Link>
          <Rating rating={2.5} />
          <b style={{ fontSize: "18px" }}>${price}</b>
          <div className='d-flex justify-content-center mt-1'>
            {isWishList ? (
              <button
                id='removeFromWishListBtn'
                onClick={onClick}
                type='button'
                className='btn btn-outline-secondary'
              >
                <i className='fas fa-times'></i> Remove from Wishlist
              </button>
            ) : (
              <button
                id='addToWishListBtn'
                type='button'
                onClick={onClick}
                className='btn btn-primary'
              >
                <i className='fas fa-heart'></i> Add to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

import React from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

const ProductFilter = () => {
  return (
    <>
      <div className='card mb-2'>
        <h5 className='card-title'>Search</h5>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Keyword'
            aria-label='Keyword'
            aria-describedby='button-search'
          />
          <button
            className='btn btn-sm btn-outline-primary'
            type='button'
            id='button-search'
          >
            <i className='fas fa-search'></i>
          </button>
        </div>
      </div>
      <div className='card mb-2'>
        <h5 className='card-title'>Category</h5>
        <div className='list-group search-category'>
          <Link
            to='/'
            className='list-group-item list-group-item-action active'
            aria-current='true'
          >
            All
          </Link>
          <Link to='/' className='list-group-item list-group-item-action'>
            Coffee
          </Link>
          <Link to='/' className='list-group-item list-group-item-action'>
            Tea
          </Link>
          <Link to='/' className='list-group-item list-group-item-action'>
            Breakfast
          </Link>
        </div>
      </div>
      <div className='card mb-2'>
        <h5 className='card-title'>Rating</h5>
        <div>
          <Link to='/' className='rating-link'>
            <StarRating rating={4} />
            <small>&#x26; Up</small>
          </Link>
        </div>
        <div>
          <Link to='/' className='rating-link'>
            <StarRating rating={3} />
            <small>&#x26; Up</small>
          </Link>
        </div>
        <div>
          <Link to='/' className='rating-link'>
            <StarRating rating={2} />
            <small>&#x26; Up</small>
          </Link>
        </div>
        <div>
          <Link to='/' className='rating-link'>
            <StarRating rating={1} />
            <small>&#x26; Up</small>
          </Link>
        </div>
      </div>
      <div className='d-grid gap-2 mb-2'>
        <button className='btn btn-block btn-danger'>
          Clear filter &nbsp;<i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </>
  );
};

export default ProductFilter;

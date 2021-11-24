import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Video = ({ video, onClick, style }) => {
  const { videoId, averageRating, thumnails, title, totalRatings } = video;

  return (
    <div className='col' style={style || {}}>
      <div className='card shadow-sm'>
        <Link to={`/products/${videoId}`} className='product-list-link'>
          <div className='product-list-image'>
            <img src={thumnails} alt={title} />
            <div className='middle'>
              <div className='text'>
                <i className='fas fa-play-circle'></i>
              </div>
            </div>
          </div>
        </Link>
        <div className='card-body'>
          <Link to={`/products/${videoId}`} className='product-list-link'>
            <h6 className='text-center'>{title}</h6>
          </Link>
          {/* <Rating rating={averageRating} totalReviews={totalRatings} /> */}
          <Rating />
          <div className='d-flex justify-content-center mt-1'>
            <a
              id='addToWishListBtn'
              type='button'
              href={`/products/${videoId}`}
              className='btn btn-primary'
            >
              <i className='fas fa-play'></i> Watch now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

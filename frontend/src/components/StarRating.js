import React from "react";
import constants from "../config/constants";

const StarRating = ({ rating }) => {
  const starRatingColor = "#fecf0a";
  return (
    <>
      <span>
        <i
          style={{ color: starRatingColor }}
          className={
            rating >= 1
              ? "fas fa-star star-fill"
              : rating >= 0.5
              ? "fas fa-star-half-alt star-fill"
              : "far fa-star star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starRatingColor }}
          className={
            rating >= 2
              ? "fas fa-star star-fill"
              : rating >= 1.5
              ? "fas fa-star-half-alt star-fill"
              : "far fa-star star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starRatingColor }}
          className={
            rating >= 3
              ? "fas fa-star star-fill"
              : rating >= 2.5
              ? "fas fa-star-half-alt star-fill"
              : "far fa-star star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starRatingColor }}
          className={
            rating >= 4
              ? "fas fa-star star-fill"
              : rating >= 3.5
              ? "fas fa-star-half-alt star-fill"
              : "far fa-star star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: starRatingColor }}
          className={
            rating >= 5
              ? "fas fa-star star-fill"
              : rating >= 4.5
              ? "fas fa-star-half-alt star-fill"
              : "far fa-star star-empty"
          }
        ></i>
      </span>
      <span className='fw-bold'>
        {" "}
        - {constants.PRODUCT_RATING[Math.round(rating)]}
      </span>
    </>
  );
};

export default StarRating;

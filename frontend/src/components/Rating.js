import React from "react";

const Rating = ({ rating, totalReviews }) => {
  const starRatingColor = "#fecf0a";
  return (
    <div
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
      className='row d-flex justify-content-between align-items-center product-rating'
    >
      <div>
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
        &nbsp;from {totalReviews} review(s)
      </div>
    </div>
  );
};

Rating.defaultProps = {
  totalReviews: 0,
  rating: 3.5,
};

export default Rating;

import React from "react";
import StarRating from "./StarRating";

const Rating = ({ rating, totalReviews }) => {
  return (
    <div
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
      className='row d-flex justify-content-between align-items-center product-rating'
    >
      <div>
        <StarRating rating={rating} />
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

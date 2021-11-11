import React from "react";
import StarRating from "./StarRating";
import { BsFillPersonFill } from "react-icons/bs";
import formatDate from "../services/utils/formatDate";

const ProductReviewItem = (props) => {
  const { name, rating, comment, updatedAt } = props.review;
  return (
    <>
      <div className='row'>
        <div className='col-md-4'>
          <img
            src='https://styles.redditmedia.com/t5_ma1hc/styles/profileIcon_snoo4c2ce00a-2f6b-4615-ba78-23ada548a710-headshot.png'
            className='img-rounded'
            alt={`avatar of ${name}`}
          />
          <div className='review-block-name'>
            <span>{name}</span>
          </div>
          <div className='review-block-date'>
            Reviewed on{" "}
            {formatDate(
              updatedAt ?? new Date().toISOString(),
              "dddd, MMMM Do YYYY, HH:mm:ss"
            )}
          </div>
        </div>
        <div className='col-md-8'>
          <div className='review-block-rate'>
            <StarRating rating={rating} />
          </div>
          {/* <div className='float-left'>this was nice in buy</div> */}
          <p className='review-block-description'>{comment}</p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ProductReviewItem;

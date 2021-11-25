import React from "react";
import StarRating from "./StarRating";
import formatDate from "../services/utils/formatDate";
import axios from "axios";

const ProductReviewItem = (props) => {
  // const { name, rating, comment, updatedAt } = props.review;
  const deleteComment = (videoId, commentId) => {
    let url = `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos/${videoId}/comments/${commentId}`;
    axios
      .create({
        timeout: 10000,
        headers: {
          "X-Requested-Width": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
      .delete(url)
      .then(function () {
        console.log("delete comment successfully");
        document.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className='row'>
        <div className='col-md-4'>
          <img
            src='https://i.redd.it/mozfkrjpoa261.png'
            className='img-rounded'
            alt={`avatar of Anonymous`}
          />
          <div className='review-block-name'>
            <span>Anonymous</span>
          </div>
          <div className='review-block-date'>
            Reviewed on 2021-11-11
            {/* {formatDate(
              updatedAt ?? new Date().toISOString(),
              "dddd, MMMM Do YYYY, HH:mm:ss"
            )} */}
          </div>
        </div>
        <div className='col-md-8'>
          <div className='review-block-rate'>
            <StarRating rating={3.5} />
            <span
              style={{ float: "right" }}
              className='mx-1'
              onClick={() => deleteComment(1, 2)}
            >
              <i className='fas fa-trash'></i>
            </span>
            <span
              style={{ float: "right" }}
              className='mx-1'
              onClick={() => console.log("edit mode")}
            >
              <i className='fas fa-edit'></i>
            </span>
          </div>
          {/* <div className='float-left'>this was nice in buy</div> */}
          <p className='review-block-description'>{"Hello world"}</p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ProductReviewItem;

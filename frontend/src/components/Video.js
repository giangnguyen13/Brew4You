import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import axios from "axios";

const Video = ({ video, onClick, style }) => {
  const { videoId, averageRating, thumnails, title, totalRatings } = video;
  const deleteVideo = (videoId) => {
    let url = `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos/${videoId}`;
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
        console.log("delete video successfully");
        document.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
          {/* <Rating /> */}
          <div className='d-flex justify-content-center mt-1'>
            <a
              id='addToWishListBtn'
              type='button'
              href={`/products/${videoId}`}
              className='btn btn-primary mx-1'
            >
              <i className='fas fa-play'></i>
            </a>
            <a
              id='addToWishListBtn'
              type='button'
              href={`/products/${videoId}/edit`}
              className='btn btn-success mx-1'
            >
              <i className='fas fa-edit'></i>
            </a>
            <button
              id='addToWishListBtn'
              type='button'
              onClick={() => deleteVideo(videoId)}
              className='btn btn-danger mx-1'
            >
              <i className='fas fa-trash'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

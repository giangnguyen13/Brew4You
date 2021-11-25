import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import ProductReview from "../components/ProductReview";
import ProductReviewItem from "../components/ProductReviewItem";
import { videos } from "../data2";
import axios from "axios";
import Loader from "../components/Loader";

const VideoScreen = () => {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .create({
        timeout: 10000,
        headers: {
          "X-Requested-Width": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
      .get(
        `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos/${id}?withComment=true`
      )
      .then(function (response) {
        // handle success
        const data = response.data;
        setVideo(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        setVideo(videos[0]);
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className='card' style={{ border: "none" }}>
      <Header />
      <div className='col-lg-2 col-sm-3'>
        <Link to='/menu/all' className='btn btn-primary'>
          Back to menu
        </Link>
      </div>
      <div className='row no-gutters mt-3'>
        <aside className='offset-md-1 col-md-10'>
          <article className='gallery-wrap'>
            <div className='img-big-wrap'>
              <iframe
                width='1080'
                height='720'
                src={video.url?.replace("watch?v=", "embed/")}
                title={video.title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </article>
          <article className='content-body'>
            <h1 className='product-title'>{video.title}</h1>
            <p>{video.description}</p>
          </article>
          <ProductReview loggedIn={true} productId={video.videoId} />
        </aside>
        <main className='col-md-6 border-left'></main>
      </div>
      <div className='row mt-2'>
        <div className='col-md-6 col-lg-4 offset-4'>
          <hr />
        </div>
        <div className='col-md-6 offset-md-3'>
          <h3 className='text-center'>Comments</h3>
          <div
            className={`review-block ${
              video?.comments?.length == 0 ? "text-center" : ""
            }`}
          >
            {video?.comments?.length == 0 && (
              <h5>
                There is no comment yet. Be the first customer to review this
                product
              </h5>
            )}
            {video.comments &&
              video.comments
                // .sort((a, b) => -a.updatedAt.localeCompare(b.updatedAt))
                .map((comment) => (
                  <ProductReviewItem key={comment.commentId} review={null} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;

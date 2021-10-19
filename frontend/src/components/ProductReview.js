import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import { END_POINTS } from "../services/api/endpoints";
import { api } from "../services/api/config";
import { user_config } from "../config/auth";
import constants from "../config/constants";
import handleLogin from "../services/utils/handleLogin";
import ProductReviewItem from "./ProductReviewItem";

const ProductReview = ({ loggedIn, productId }) => {
  const [review, setReview] = useState({
    user: "",
    rating: "",
    comment: "",
  });

  const [error, setError] = useState("");
  const [customerReview, setCustomerReview] = useState(0);
  const hoverRating = (value) => {
    setCustomerReview(value);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setReview({ ...review, [name]: value });
  };

  const handleRatingClick = (value) => {
    setCustomerReview(value);
    setReview({ ...review, rating: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (review.rating) {
      await api
        .post(
          `${END_POINTS.POST_PRODUCT_REVIEW}/${productId}/review`,
          review,
          user_config
        )
        .then((response) => {
          const review = response?.data;
          const reactElement = React.createElement(ProductReviewItem, {
            review: review,
          });
          const newHTML = ReactDOMServer.renderToString(reactElement);
          document
            .getElementsByClassName("review-block")[0]
            .insertAdjacentHTML("afterbegin", newHTML);

          setError("");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setError("Please provide your rating before submit the review");
    }
  };

  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h4>Write a Customer Review</h4>
        {loggedIn ? (
          <Form onSubmit={submitHandler}>
            <Form.Group className='comment-section'>
              <Form.Label htmlFor='rating'>Rating</Form.Label>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}
              <div className='my-3'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type='button'
                    key={value}
                    className='btn'
                    onMouseOver={() => hoverRating(value)}
                    onClick={() => handleRatingClick(value)}
                  >
                    <i
                      style={{ color: "#fecf0a" }}
                      className={`fa-star ${
                        customerReview >= value
                          ? "fas star-fill"
                          : "far star-empty"
                      }`}
                    ></i>
                  </button>
                ))}
                &nbsp;- {constants.PRODUCT_RATING[customerReview]}
              </div>
            </Form.Group>
            <Form.Group className='comment-section'>
              <Form.Label htmlFor='comment'>Comment (optional)</Form.Label>
              <Form.Control
                as='textarea'
                row='5'
                name='comment'
                placeholder='Leave us what you think about this product'
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='float-end'>
              Submit Review
            </Button>
          </Form>
        ) : (
          <Message>
            Please{" "}
            <Link to='#' onClick={handleLogin}>
              sign in
            </Link>{" "}
            to write your review
          </Message>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ProductReview;

import React, { useState } from "react";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import constants from "../config/constants";

const ProductReview = ({ loggedIn }) => {
  const [review, setReview] = useState({
    userId: "",
    rating: "",
    comment: "",
  });
  const [customerReview, setCustomerReview] = useState(5);
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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(review);
  };

  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h4>Write a Customer Review</h4>
        {loggedIn ? (
          <Form onSubmit={submitHandler}>
            <Form.Group className='comment-section'>
              <Form.Label htmlFor='rating'>Rating</Form.Label>
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
            Please <Link to='/login'>sign in</Link> to write your review
          </Message>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ProductReview;

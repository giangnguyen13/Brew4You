import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Header from "../components/Header";
import axios from "axios";
import { videos } from "../data2";

const EditCommentScreen = () => {
  const { id, commentId } = useParams();
  const [comment, setComment] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setComment({ ...comment, [name]: value });
  };

  const createNew = (event) => {
    event.preventDefault();
    console.log("form submit");
    console.log(comment);
    let url = `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos/${id}/comments/${commentId}`;
    axios
      .create({
        timeout: 10000,
        headers: {
          "X-Requested-Width": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
      .put(url, comment)
      .then(function (response) {
        const video = response.data;
        console.log(video);
        document.location.href = `/products/${video.videoId}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos/${id}/comments/${commentId}`
      )
      .then(function (response) {
        // handle success
        const data = response.data;
        let dbVideo = {
          Content: data.content,
        };
        setComment(dbVideo);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className='card' style={{ border: "none" }}>
      <Header />
      <Form onSubmit={createNew}>
        <Form.Group className='mb-3' controlId='video.description'>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            onChange={handleChange}
            value={comment.Content}
            name='Content'
          />
        </Form.Group>
        <Form.Group className='mb-3 text-center' controlId='video.description'>
          <button type='submit' className='btn btn-lg btn-success'>
            Edit comment
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditCommentScreen;

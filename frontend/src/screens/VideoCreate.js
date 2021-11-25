import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Header from "../components/Header";
import axios from "axios";

const VideoCreate = () => {
  const [video, setVideo] = useState({
    Title: "",
    Thumnails: "",
    Url: "",
    Description: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVideo({ ...video, [name]: value });
  };
  const createNew = (event) => {
    event.preventDefault();
    console.log("form submit");
    console.log(video);
    let url = `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos`;
    axios
      .create({
        timeout: 10000,
        headers: {
          "X-Requested-Width": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
      .post(url, video)
      .then(function (response) {
        const video = response.data;
        document.location.href = `/products/${video.videoId}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className='card' style={{ border: "none" }}>
      <Header />
      <Form onSubmit={createNew}>
        <Form.Group className='mb-3' controlId='video.title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Video Title'
            name='Title'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='video.thumnails'>
          <Form.Label>Video Thumnails</Form.Label>
          <Form.Control
            type='text'
            placeholder='Video Thumnails'
            name='Thumnails'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='video.url'>
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Video URL'
            name='Url'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='video.description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            onChange={handleChange}
            name='Description'
          />
        </Form.Group>
        <Form.Group className='mb-3 text-center' controlId='video.description'>
          <button type='submit' className='btn btn-lg btn-success'>
            Upload video
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default VideoCreate;

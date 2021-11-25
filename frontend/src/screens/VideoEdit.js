import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Header from "../components/Header";
import axios from "axios";
import { videos } from "../data2";

const VideoEdit = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
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
    let url = `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos/${id}`;
    axios
      .create({
        timeout: 10000,
        headers: {
          "X-Requested-Width": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
      .put(url, video)
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
        `http://lb-webapiwithpattern-1698811078.us-east-1.elb.amazonaws.com/api/videos/${id}`
      )
      .then(function (response) {
        // handle success
        const data = response.data;
        let dbVideo = {
          Title: data.title,
          Thumnails: data.thumnails,
          Url: data.url,
          Description: data.description,
        };
        setVideo(dbVideo);
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
      <Form onSubmit={createNew}>
        <Form.Group className='mb-3' controlId='video.title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Video Title'
            name='Title'
            value={video.Title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='video.thumnails'>
          <Form.Label>Video Thumnails</Form.Label>
          <Form.Control
            type='text'
            placeholder='Video Thumnails'
            name='Thumnails'
            value={video.Thumnails}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='video.url'>
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Video URL'
            name='Url'
            value={video.Url}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='video.description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            onChange={handleChange}
            value={video.Description}
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

export default VideoEdit;

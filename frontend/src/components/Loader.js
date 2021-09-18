import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner animation='border' role='status' id='app-spinner'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;

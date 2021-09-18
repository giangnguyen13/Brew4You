import React from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submit event");
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='query'
        onChange={(e) => console.log("Hello")}
        placeholder='Search Product...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

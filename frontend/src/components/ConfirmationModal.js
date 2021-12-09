import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = (props) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter' className='text-danger'>
          You are not logged in!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are creating a new order without Brew4You account, which might
          leads to some inconvenient from your side later on. For example you
          will not be able to view your order history. Moreover, you will miss
          bunch of our special offers, coupons, or discounts, etc...
        </p>
        <h4>Would you like to register with us?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onDecline} className='btn btn-danger'>
          Proceed to checkout
        </Button>
        <Button onClick={props.onConfirm} className='btn btn-success'>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;

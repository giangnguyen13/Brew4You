import React from "react";
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

const AddressForm = (props) => {
  const {street, city, postalCode, province, country} = props.address
  return (
    <Card style={{marginTop: '5rem'}}>
    <Card.Header>Shipping Address</Card.Header>
    <Card.Body>
    <Form>
  <Row>
    <Col>
    <Card.Text>Street</Card.Text>
      <Form.Control  required  value={street} disabled />
    </Col>
    
  </Row>
  <Row>
  <Col>
    <Card.Text>City</Card.Text>
      <Form.Control  required  value={city} disabled />
    </Col>
  <Col>
    <Card.Text>Postal Code</Card.Text>
      <Form.Control  required  value={postalCode} disabled />
    </Col>
   
  </Row>
  <Row>
    <Col>
    <Card.Text>Province</Card.Text>
      <Form.Control  required  value={province} disabled />
    </Col>
    <Col>
    <Card.Text>Country</Card.Text>
      <Form.Control  required  value={country} disabled/>
    </Col>
  </Row>
</Form>
    
  </Card.Body>

</Card>
  )
};

export default AddressForm;

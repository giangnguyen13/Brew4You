import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='footer mt-auto py-3'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; {currentYear} Brew4You
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

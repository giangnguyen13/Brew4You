import React, { useState, useEffect } from "react";
import { getLoggedUserProfile } from "../actions/userActions";
import Header from "../components/Header";
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({});
  const [shouldDisplayProfileInfo, setShouldDisplayProfileInfo] = useState(false);

  const _handleDisplayProfileInfo = () => {
    setShouldDisplayProfileInfo(true)
  }

  const _handleCancelProfileUpdate = () => {
    setShouldDisplayProfileInfo(false)
  }
  useEffect(() => {
    (async () => {
      const profile = await getLoggedUserProfile();
      setUserProfile(profile);
    })()
  }, []);
  return (
    <>
    <Header/>
    <Card style={{ width: '30rem', marginLeft: '25rem' }}>
    <Card.Img variant="top" src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" />
    {!shouldDisplayProfileInfo && 
        <button type="button" class="btn btn-primary btn-md" onClick={_handleDisplayProfileInfo}>Edit profile</button>
    }
    <Card.Body>
      {shouldDisplayProfileInfo && <Form>
  <Row>
    <Col>
    <Card.Text> First Name</Card.Text>
      <Form.Control value={userProfile?.firstName} />
    </Col>
    <Col>
      <Card.Text> Last Name</Card.Text>
      <Form.Control value={userProfile?.lastName} />
    </Col>
  
  </Row>
  <Row>
  <Col>
      <Card.Text> Email </Card.Text>
      <Form.Control placeholder={userProfile?.email} disabled/>
    </Col>
  </Row>
  <Row>
  <Col>
      <Card.Text> Line Address </Card.Text>
      <Form.Control value={"137 Progress Avenue"} />
    </Col>
  </Row>
  <Row>
  <Col>
      <Card.Text> City </Card.Text>
      <Form.Control value={"Toronto"} />
    </Col>
    <Col>
      <Card.Text> Postal Code </Card.Text>
      <Form.Control value={"M1G3T8"} />
    </Col>
  </Row>
  <Row>
  <Col>
      <Card.Text> Province </Card.Text>
      <Form.Control value={"ON"} />
    </Col>
    <Col>
      <Card.Text> Country </Card.Text>
      <Form.Control value={"CA"} />
    </Col>
  </Row>
  <Row>
    <Col style={{margin: '1rem'}}>
    <button type="button" class="btn btn-success btn-md" onClick={_handleDisplayProfileInfo}>Save</button>
    <button type="button" class="btn btn-secondary btn-md m-1" onClick={_handleCancelProfileUpdate}>Cancel</button>
    </Col>
  </Row>
</Form>}
    
  </Card.Body>
</Card>
    </>
    
  );
};

export default ProfileScreen;

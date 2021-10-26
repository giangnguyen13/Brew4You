import React, { useState, useEffect } from "react";
import { getLoggedUserProfile } from "../actions/userActions";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";
import { user_config } from "../config/auth";
import Toast from "react-bootstrap/Toast";
import { MdNotificationsActive } from "react-icons/md";

const initialFormValues = {
  firstName: "First Name",
  lastName: "Last Name",
  street: "Street Name",
  postalCode: "Postal Code",
  city: "City",
  province: "province",
  country: "Country",
};

const ProfileScreen = () => {
  const [formValues, setFormValues] = useState({ initialFormValues });
  const [shouldDisplayProfileInfo, setShouldDisplayProfileInfo] =
    useState(false);
  const [shouldDisplayNotification, setShouldDisplayNotification] =
    useState(false);
  const [notification, setNotification] = useState();

  const displayNotification = (message, variant) => {
    setNotification({ message, variant });
    setShouldDisplayNotification(!shouldDisplayNotification);
  };

  const _handleDisplayProfileInfo = () => {
    setShouldDisplayProfileInfo(true);
  };

  const _handleUpdateProfileInfo = async () => {
    try {
      const {
        firstName,
        lastName,
        street,
        postalCode,
        city,
        province,
        country,
        subscribed
      } = formValues;
      const address = { street, postalCode, city, province, country };
      const profile = { firstName, lastName, address, subscribed, email: formValues.email };
   
      await api
        .put(END_POINTS.UPDATE_USER_PROFILE, { profile }, { ...user_config })
        .then((response) => {
          if (!response?.data?.error) {
            displayNotification("Profile updated!", "success");
          }
        })
        .catch((err) => {
          displayNotification(err.message, "danger");
        });
    } catch (err) {
      displayNotification(err.message, "danger");
    }
  };

  const _handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const _handleCancelProfileUpdate = () => {
    setShouldDisplayProfileInfo(false);
  };
  const handleSubscribe = (e) => {
    setFormValues({ ...formValues, subscribed: e.target.checked });
  }
  useEffect(() => {
    (async () => {
      const profile = await getLoggedUserProfile();
      const { address } = profile;
      setFormValues({ ...profile, ...address });
    })();
  }, []);
  return (
    <>
      <Header />
      <Card style={{ width: "30rem", marginLeft: "25rem" }}>
        <Card.Img
          variant='top'
          src='https://styles.redditmedia.com/t5_ma1hc/styles/profileIcon_snoo4c2ce00a-2f6b-4615-ba78-23ada548a710-headshot.png'
        />
        {!shouldDisplayProfileInfo && (
          <button
            type='button'
            className='btn btn-primary btn-md'
            onClick={_handleDisplayProfileInfo}
          >
            Edit profile
          </button>
        )}
        <Card.Body>
          {shouldDisplayProfileInfo && (
            <Form>
              <Row>
                <Col>
                  <Card.Text> First Name</Card.Text>
                  <Form.Control
                    placeholder={formValues.firstName}
                    value={formValues.firstName}
                    onChange={_handleFormInputChange}
                    name='firstName'
                  />
                </Col>
                <Col>
                  <Card.Text> Last Name</Card.Text>
                  <Form.Control
                    placeholder={formValues.lastName}
                    value={formValues.lastName}
                    onChange={_handleFormInputChange}
                    name='lastName'
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text> Email </Card.Text>
                  <Form.Control placeholder={formValues.email} disabled />
                </Col>
              </Row>
              <Row style={{margin: "5px 0px"}}>
                <Col>
                  <Card.Text><span><input type="checkbox" onChange={handleSubscribe} checked={formValues.subscribed}/></span> Subscribe to receive notifications from us</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text> Line Address </Card.Text>
                  <Form.Control
                    placeholder={formValues.address.street}
                    value={formValues.street}
                    onChange={_handleFormInputChange}
                    name='street'
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text> City </Card.Text>
                  <Form.Control
                    placeholder={formValues.address.city}
                    value={formValues.city}
                    onChange={_handleFormInputChange}
                    name='city'
                  />
                </Col>
                <Col>
                  <Card.Text> Postal Code </Card.Text>
                  <Form.Control
                    placeholder={formValues.address.postalCode}
                    value={formValues.postalCode}
                    onChange={_handleFormInputChange}
                    name='postalCode'
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text> Province </Card.Text>
                  <Form.Control
                    placeholder={formValues.address.province}
                    value={formValues.province}
                    onChange={_handleFormInputChange}
                    name='province'
                  />
                </Col>
                <Col>
                  <Card.Text> Country </Card.Text>
                  <Form.Control
                    placeholder={formValues.address.country}
                    value={formValues.country}
                    onChange={_handleFormInputChange}
                    name='country'
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{ margin: "1rem" }}>
                  <button
                    type='button'
                    className='btn btn-success btn-md m-1'
                    onClick={_handleUpdateProfileInfo}
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary btn-md m-1'
                    onClick={_handleCancelProfileUpdate}
                  >
                    Cancel
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Card.Body>
      </Card>
      {notification && shouldDisplayNotification && (
        <div style={{ position: "fixed", bottom: 10, right: 4 }}>
          <Toast
            onClose={() => setShouldDisplayNotification(false)}
            show={shouldDisplayNotification}
            delay={3000}
            autohide
            bg={notification.variant}
          >
            <Toast.Header>
              <MdNotificationsActive />
              <strong className='me-auto'>Notification</strong>
              <small>Now</small>
            </Toast.Header>
            <Toast.Body className='text-white'>
              {notification.message}
            </Toast.Body>
          </Toast>
        </div>
      )}
    </>
  );
};

export default ProfileScreen;

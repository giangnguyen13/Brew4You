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

const SecurityScreen = () => {
  const [formValues, setFormValues] = useState({});
  const [shouldDisplayNotification, setShouldDisplayNotification] =
    useState(false);
  const [notification, setNotification] = useState();

  const displayNotification = (message, variant) => {
    setNotification({ message, variant });
    setShouldDisplayNotification(!shouldDisplayNotification);
  };

  const _handleUpdateUserPassword = async (e) => {
    try {
      e.preventDefault();
      const { currentPassword, newPassword, confirmPassword } = formValues;
      const password = { currentPassword, newPassword, confirmPassword };
      if (newPassword !== confirmPassword) {
        displayNotification("Password must match!", "danger");
      } else {
        await api
          .put(
            END_POINTS.UPDATE_USER_PASSWORD,
            { password },
            { ...user_config }
          )
          .then((response) => {
            const { error, message, code } = response.data;
            if (error) {
              displayNotification(message, "danger");
            } else {
              displayNotification(message, "success");
            }
          })
          .catch((err) => {
            displayNotification(err.message, "danger");
          });
      }
    } catch (err) {
      displayNotification(err.message, "danger");
    }
  };

  const _handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Header />
      <Card style={{ width: "30rem", marginLeft: "25rem" }}>
        <Card.Header>Update your password</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Card.Text>Current password</Card.Text>
                <Form.Control
                  type='password'
                  required
                  value={formValues.currentPassword}
                  onChange={_handleFormInputChange}
                  name='currentPassword'
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text>New password</Card.Text>
                <Form.Control
                  type='password'
                  required
                  value={formValues.newPassword}
                  onChange={_handleFormInputChange}
                  name='newPassword'
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text>Confirm password</Card.Text>
                <Form.Control
                  type='password'
                  required
                  value={formValues.confirmPassword}
                  onChange={_handleFormInputChange}
                  name='confirmPassword'
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ margin: "1rem" }}>
                <button
                  type='submit'
                  className='btn btn-success btn-md'
                  onClick={_handleUpdateUserPassword}
                >
                  Update
                </button>
              </Col>
            </Row>
          </Form>
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

export default SecurityScreen;

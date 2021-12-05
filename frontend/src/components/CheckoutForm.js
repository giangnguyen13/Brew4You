import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";
import { user_config } from "../config/auth";
import Toast from "react-bootstrap/Toast";
import { MdNotificationsActive } from "react-icons/md";

const CheckoutForm = (props) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [shouldDisplayNotification, setShouldDisplayNotification] =
    useState(false);
  const [notification, setNotification] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const { order } = props;

  const displayNotification = (message, variant) => {
    setNotification({ message, variant });
    setShouldDisplayNotification(!shouldDisplayNotification);
  };

  useEffect(() => {
    (async () => {
      if (order.totalPrice) {
        await api
          .post(
            END_POINTS.CREATE_PAYMENT_INTENT,
            { amount: order.totalPrice },
            user_config
          )
          .then((response) => {
            setClientSecret(response?.data?.clientSecret);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    })();
  }, [props.order]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const response = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (response.error) {
      setError(`Payment failed ${response.error.message}`);
      setShouldDisplayNotification(true);
      displayNotification(`Payment Failed`, "danger");
      setProcessing(false);
    } else if (
      response.paymentIntent &&
      response.paymentIntent.status === "succeeded"
    ) {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      // clear the session to prepare for new order
      sessionStorage.clear();
      setShouldDisplayNotification(true);
      displayNotification(`Payment Succeeded`, "success");
      await api
        .patch(
          `${END_POINTS.UPDATE_ORDER_STATUS}/${order._id}?status=paid`,
          null,
          user_config
        )
        .then((response) => {
          if (!response.data.error) {
            setTimeout((_) => {
              window.location = `/track-order?oid=${order._id}`;
            }, 3000);
          } else {
            displayNotification(response.data.message, "info");
          }
        });
    }
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='form'>
      <CardElement
        id='card-element'
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id='submit'>
        <span id='button-text'>
          {processing ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
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
    </form>
  );
};

export default CheckoutForm;

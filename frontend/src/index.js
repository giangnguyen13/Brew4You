import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51JghOoKtvEVPAnxSZoCZLBJ4jxfXMB6Rao3sA0NB15oHUBZIPQfrcysZwkCKXyIOLsRHW8nTpNJb2kmdm1djDTUc00uWChcFDs");

ReactDOM.render(
  
    <React.StrictMode>
      <Elements stripe={stripePromise}>
    <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

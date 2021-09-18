import React, { useState } from "react";

import PageBreadcrumb from "../components/PageBreadcrumb";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`send forgot link to ${email}`);
  };
  return (
    <>
      <PageBreadcrumb />
      <div className='login-form card'>
        <div className='card-body'>
          <form className='text-center' onSubmit={submitHandler}>
            <h1 className='h3 mb-3 fw-normal'>Forgot Password</h1>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='email'>
                <i className='fa fa-envelope'></i>
              </span>
              <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
                placeholder='example@example.com'
                aria-label='example@example.com'
                aria-describedby='email'
              />
              {errorMessage && (
                <small className='text-danger'>{errorMessage}</small>
              )}
            </div>
            <button className='w-100 btn btn-lg btn-primary mt-1' type='submit'>
              <i className='fas fa-sign-in-alt'></i> Send Forgot password link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordScreen;

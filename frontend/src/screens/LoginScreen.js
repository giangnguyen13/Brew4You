import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import Header from "../components/Header";

const LoginScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [credential, setCredential] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitHandler has been called??')
    login(credential.email, credential.password);
    // console.log("Dispatch login action");
    // setErrorMessage("Your credentials doesn't match our records");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredential({ ...credential, [name]: value });
  };
  return (
    <>
      <Header />
      <div className='login-form card mt-5'>
        <div className='card-body'>
          
          <form className='text-center' onSubmit={submitHandler}>
            <h1 className='h3 mb-3 fw-normal'>Sign in</h1>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='email'>
                <i className='fa fa-envelope'></i>
              </span>
              <input
                type='text'
                className='form-control'
                placeholder='example@example.com'
                aria-label='example@example.com'
                aria-describedby='email'
                id='email'
                required
                name='email'
                value={credential.email}
                onChange={handleChange}
              />
            </div>
            <div className='input-group'>
              <span className='input-group-text' id='password'>
                <i className='fa fa-lock'></i>
              </span>
              <input
                type='password'
                className='form-control'
                placeholder='Enter your password'
                aria-label='Enter your password'
                aria-describedby='password'
                id='password'
                name='password'
                required
                value={credential.password}
                onChange={handleChange}
              />
            </div>
            {errorMessage && (
              <small className='text-danger'>{errorMessage}</small>
            )}
            <div className='form-group m-3'>
              <Link to='forgot-password' style={{ textDecoration: "none" }}>
                Forgot password
              </Link>
            </div>
            <button className='w-100 btn btn-lg btn-primary' type='submit'>
              <i className='fas fa-sign-in-alt'></i> Sign in
            </button>
          </form>
        </div>
        <div className='card-footer text-center'>
          New Customer? &nbsp;
          <Link to='/signup' className='btn btn-sm btn-secondary'>
            Sign up now
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;

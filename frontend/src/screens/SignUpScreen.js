import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Header from "../components/Header";

const SignUpScreen = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const validatePassword = (inputPassword) => {
    if (inputPassword.length < 8) {
      setPasswordError(true);
      setErrorMessage("Password must be 8 characters long.!");
    } else {
      setPasswordError(false);
      setErrorMessage("");
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordError(false);
    setConfirmPasswordError(false);

    setUser({ ...user, [name]: value });
    if (name === "password") {
      validatePassword(value);
    }
    if (name === "confirmPassword" && value !== user.password) {
      setConfirmPasswordError(true);
      setErrorMessage("Password doesn't match");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    register(user);
    console.log("Dispatch sign up action");
  };
  return (
    <>
      <Header />
      <div className='login-form card'>
        <div className='card-body'>
          <form className='text-center' onSubmit={submitHandler}>
            <h1 className='h3 mb-3 fw-normal'>Create Account</h1>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='name'>
                <i className='fas fa-user'></i>
              </span>
              <input
                name='firstName'
                onChange={handleChange}
                required
                type='text'
                className='form-control'
                placeholder='First Name'
                aria-label='First Name'
                aria-describedby='name'
              />
              <input
                name='lastName'
                onChange={handleChange}
                type='text'
                required
                className='form-control'
                placeholder='Last Name  '
                aria-label='Last Name '
                aria-describedby='name'
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='email'>
                <i className='fa fa-envelope'></i>
              </span>
              <input
                type='email'
                name='email'
                onChange={handleChange}
                required
                className='form-control'
                placeholder='example@example.com'
                aria-label='example@example.com'
                aria-describedby='email'
              />
            </div>
            <div className='input-group mt-3'>
              <span className='input-group-text' id='password'>
                <i className='fa fa-lock'></i>
              </span>
              <input
                type='password'
                name='password'
                required
                onChange={handleChange}
                className='form-control'
                placeholder='Enter your password'
                aria-label='Enter your password'
                aria-describedby='password'
              />
            </div>
            {passwordError && (
              <small className='text-danger'>{errorMessage}</small>
            )}
            <div className='input-group mt-3'>
              <span className='input-group-text' id='confirmPassword'>
                <i className='fa fa-lock'></i>
              </span>
              <input
                type='password'
                name='confirmPassword'
                onChange={handleChange}
                className='form-control'
                required
                placeholder='Confirm your password'
                aria-label='Confirm your password'
                aria-describedby='password'
              />
            </div>
            {confirmPasswordError && (
              <small className='text-danger'>{errorMessage}</small>
            )}
            <button className='w-100 btn btn-lg btn-primary mt-3' type='submit'>
              <i className='fas fa-user-plus'></i> Create new account
            </button>
          </form>
        </div>
        <div className='card-footer text-center'>
          Already have an account? &nbsp;
          <Link to='/login' className='btn btn-sm btn-secondary'>
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpScreen;

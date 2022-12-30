

import { APP_NAME, API_URL, EMAIL_PATTERN_VALIDATION } from "../environments/env";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

import _Toast from "../components/Toast";

// Boostrap imports
import { Toast } from 'bootstrap'

/* Configs */
const passwordValidPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


/**
 * Login page
 * 
 * @returns JSX template view
 */
export default function Login(props) {
  const navigate = useNavigate();

  //Toast
  const [toastMessage, setToastMessage] = useState('');

  /*
   *Email
   */
  const [email, setEmail] = useState('');
  const emailChange = function (event) {
    setEmail(event.target.value); // Update email
  };

  // Email Validation
  const [emailError, setEmailError] = useState('');
  const emailValidate = function () {
    setEmailError('');  // Reset errors

    if (!EMAIL_PATTERN_VALIDATION.test(email)) {
      setEmailError('Email is invalid.');
    }
  };

  /* 
   * Password
   */
  const [password, setPassword] = useState('');
  const passwordChange = function (event) {
    setPassword(event.target.value); // Update password
  };

  // Password validation
  const [passwordError, setPasswordError] = useState('');
  const passwordValidate = function () {
    setPasswordError('');

    if (!passwordValidPattern.test(password)) {
      setPasswordError('Min 8 characters, a letter and a number.');
    }
  }

  // Password hide
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = function () {
    setShowPassword(!showPassword);
  }

  /*
   * Login
   */
  const [isRegistering, setIsRegistering] = useState(false);

  const register = function (event) {
    event.preventDefault(); // Cancel default event

    // Check validation
    emailValidate();
    passwordValidate();

    // Is validation ok
    if (emailError === '' && passwordError === '' && email !== '') {
      // Submit to server
      login(email, password)
    }
  }

  /*
   * API register 
   */
  const login = function (email, password) {
    setIsRegistering(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
      redirect: 'follow'
    };

    fetch(`${API_URL}/login`, requestOptions)
      .then(function (response) {
        if (response.ok) {
        }

        return response.text();
      })
      .then((data) => {
        // Save token to localstorage
        props.saveToken(data);

        // Redirect to dash
        navigate('/dash');
      }).catch(function (error) {
        // showToast('Connection error.')
        setToastMessage('Connection error.');
      }).finally(function () {
        setIsRegistering(false);
      });
  };

  /*
   *JSX view
   */
  return (
    <>
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
            <form
              onSubmit={register}
              className="card border shadow-sm">
              <div className="card-body">
                <h1 className="card-title">{APP_NAME}</h1>
                <h2 className="card-subtitle mb-2 text-muted">Login to your account.</h2>

                <div className="card-text">
                  <div className="mb-3">
                    {/* Email */}
                    <label className="form-label" htmlFor="email">Email address*</label>
                    <input
                      id="email"
                      value={email}
                      onChange={emailChange}
                      onBlur={emailValidate}
                      className={`form-control form-control-lg rounded-pill ${(emailError === "") ? "" : "is-invalid"}`}
                      type="email"
                      placeholder="Enter email address." />

                    <div className="invalid-feedback">
                      {emailError}
                    </div>
                  </div>

                  <div className="mb-3">
                    {/* Password */}
                    <label className="form-label" htmlFor="password">Password*</label>

                    <div className="input-group mb-3">
                      <input
                        id="password"
                        value={password}
                        onChange={passwordChange}
                        onBlur={passwordValidate}
                        className={`form-control form-control-lg rounded-pill rounded-end ${(passwordError === "") ? "" : "is-invalid"}`}
                        type={(showPassword) ? "text" : "password"}
                        placeholder="Enter password." />

                      <button
                        onClick={toggleShowPassword}
                        className="btn btn-outline-secondary rounded-pill rounded-start" type="button" id="button-addon2">
                        <i className={(showPassword) ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                      </button>

                      <div className="invalid-feedback visible">
                        {passwordError}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill" disabled={(isRegistering) ? "disabled" : ""}>
                    Login&#160;
                    {(isRegistering) ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-box-arrow-right"></i>}
                  </button>
                </div>

                <br />

                <div className="text-center">
                  Do not have an account,
                  <a href="/register" className="btn btn-secondary rounded-pill">Register</a>
                </div>

                <br />

                <div className="text-center">
                  <a href="#" className="btn btn-link">Forgot password</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <_Toast toastMessage={toastMessage} />

      {/* TODO: Turn toast to a component*/}
      {/* <div className="toast align-items-center text-white bg-primary border-0 position-absolute bottom-0 end-0 m-2" role="alert" aria-live="assertive" aria-atomic="true" id="toast">
        <div className="d-flex">
          <div className="toast-body">
            {toastMessage}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div> */}
    </>
  );
};

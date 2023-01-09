import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_NAME, API_URL } from '../../environments/env';
import { IsEmailInValid, IsPasswordInValid } from '../../utils/Validation';
import _Toast from '../../components/Toast';

/**
 * Login page
 * 
 * @returns JSX template view
 */
export default function Login(props) {
  const navigate = useNavigate();

  // Toast
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
    setEmailError(''); // Reset errors

    if (IsEmailInValid(email)) {
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

    if (IsPasswordInValid(password)) {
      setPasswordError('Min 8 characters, a letter and a number.');
    }
  };

  // Password hide
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = function () {
    setShowPassword(!showPassword);
  };

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
  };

  /*
   * API register
   */
  const login = function (emailParam, passwordParam) {
    setIsRegistering(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailParam,
        password: passwordParam,
      }),
      redirect: 'follow',
    };

    fetch(`${API_URL}/login`, requestOptions)
      .then(function (response) {
        if (response.ok) {
          return response.text();
        }

        setToastMessage('Server error.');
        return null;
      })
      .then((data) => {
        if(data !== null) {
          props.saveToken(data);
          navigate(props.redirectURL);
        }
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
                        className="btn btn-outline-secondary rounded-pill rounded-start" type="button" id="button-addon2"
                      >
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

      <_Toast toastMessage={toastMessage} setToastMessage={setToastMessage}/>
    </>
  );
}

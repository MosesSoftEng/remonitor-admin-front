/**
 * Register account page
 * @returns JSX template view
 */
import env from "../environments/env";
import { useState } from 'react';

// Boostrap imports
import { Toast } from 'bootstrap'

/* Configs */
const emailValidPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordValidPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function Register() {
    // Setup Toast
    const toast = new Toast(document.getElementById('toast'));
    // // toast.show();
    // setTimeout(function(){toast.show();}, 3000);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = function(message) {
        setToastMessage(message);
        toast.show();
    };

    /*
     *Email
     */
    const [email, setEmail] = useState('');
    const emailChange = function (event) {
        setEmail(event.target.value); // Update email
    };

    // Email Validation
    const [emailError, setEmailInvalid] = useState('');
    const emailValidate = function () {
        setEmailInvalid('');  // Reset errors

        if (!emailValidPattern.test(email)) {
            setEmailInvalid('Email is invalid.');
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
     * Register
     */
    const [registerButtonText, setRegisterButtonText] = useState('Create Account');
    const [isRegistering, setIsRegistering] = useState(false);

    const register = function (event) {
        event.preventDefault(); // Cancel default event

        // Check validation
        emailValidate();
        passwordValidate();

        // Is validation ok
        if (emailError === '' && passwordError === '' && email !== '') {
            setRegisterButtonText('Registering..');
            setIsRegistering(true);

            // Submit to server
            authRegister(email, password)
        }
    }

    /*
     * API register 
     */
    const authRegister = function (email, password) {
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

        fetch(`${env.API_URL}/register`, requestOptions)
        .then(function(response) {
            setIsRegistering(false);
            console.log(response.status);

            if (response.ok) {
                setRegisterButtonText('Account Created');
            } else {
                setRegisterButtonText('Create Account');
            }

            return response.json();
        })
        .then((data) => {
            showToast(data.message);
        }).catch(function(error){
            setRegisterButtonText('Create Account');

            showToast('Connection error.');
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
                            className="card border border-primary">
                            <div className="card-body">
                                <h1 className="card-title">{env.appName}</h1>
                                <h2 className="card-subtitle mb-2 text-muted">Register for an account.</h2>

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
                                            placeholder="Enter email address" />

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
                                                placeholder="Enter password" />

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
                                        {registerButtonText}
                                        <i className={(isRegistering) ? "bi bi-arrow-clockwise app-spinner" : "bi bi-chevron-right"}></i>
                                    </button>
                                </div>

                                <br />

                                <div className="text-center">
                                    Have an account,
                                    <a href="/login" className="btn btn-secondary rounded-pill">Login</a>
                                </div>

                                <br />

                                <div className="text-center">
                                    <a href="#" className="btn btn-link">Private policy</a> <a href="#" className="btn btn-link">Terms of Use</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="toast align-items-center text-white bg-primary border-0 position-absolute bottom-0 end-0 m-2" role="alert" aria-live="assertive" aria-atomic="true" id="toast">
                <div className="d-flex">
                    <div className="toast-body">
                        {toastMessage}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </>
    );
};

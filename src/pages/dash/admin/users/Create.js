import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../../environments/env";
import AuthToken from '../../../../services/AuthToken';
import en from '../../../../lang/en';
import {EMAIL_PATTERN_VALIDATION} from "../../../../environments/env";

/**
 * Create group page.
 * @returns JSX template view
 */
export default function CreateUser(props) {
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();
    const { token } = AuthToken();

    // Reidrect user to register if not logged in.
    if (token === null) {
        navigate('/register');
    }

    /*
     * Name
     */
    const [name, setName] = useState('');

    const nameChange = function (event) {
        setName(event.target.value);
    };

    const [nameError, setNameError] = useState('');
    const nameValidate = function () {
        setNameError('');

        if (!name) {
            setNameError('Name is required.');
        }
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
 
         if (!EMAIL_PATTERN_VALIDATION.test(email)) {
             setEmailInvalid('Email is invalid.');
         }
     };

    /*
     * group
     */
    const [groupId, setGroupId] = useState('');

    const groupChange = function (event) {
        setGroupId(event.target.value);
    };

    const [groupError, setGroupError] = useState('');
    const groupValidate = function () {
        setGroupError('');

        if (!groupId) {
            setGroupError('Group is required.');
        }

        if(groupId === "Select user's group") {
            setGroupError('Select a group.');
        }
    };

    /*
     * Description
     */
    const [description, setDescription] = useState('');
    const descriptionChange = function (event) {
        setDescription(event.target.value);
    };

    const [descriptionError, setDescriptionError] = useState('');
    const descriptionValidate = function () {
        setDescriptionError('');

        if (!description) {
            setDescriptionError('Description is required.');
        }
    };

    /*
     * Create group
     */
    const [submitButtonText, setSubmitButtonText] = useState(en().users_create_button_text_default);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = function (event) {
        event.preventDefault(); // Cancel default event

        // Check validation
        nameValidate();
        emailValidate();
        groupValidate();
        descriptionValidate();

        // Is validation ok
        if (nameError === '' && emailError === '' && descriptionError === '' && name !== '' && groupError === '') {
            setIsSubmitting(true);

            apiCreateUser(name, email, groupId, description);
        }
    }

    /**
     * apiGetAdminGroupsNames - Get list of user's groups name.
     */
    const apiGetAdminGroupsNames = function () {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/groups/names/${props.token}`, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log('apiGetAdminGroupsNames: ', data);

                if (data.success) {
                    setGroups(data.data);
                }
            }).catch(function (error) {
                props.showToast(`Connection error`);
            });
    }

    /*
     * API register 
     */
    const apiCreateUser = function (name, email, groupId, description) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "groupId": groupId,
                "description": description,
                "token": token
            }),
            redirect: 'follow'
        };

        fetch(`${API_URL}/users`, requestOptions)
        .then(function(response) {
            setIsSubmitting(false);

            return response.json();
        })
        .then((data) => {
            props.showToast(data.message);

            console.log('apiGetAdminGroupsNames: ', data);

            if(data.success) {
                setName('');
                setDescription('');
                setGroupId('');
            }
        }).catch(function(error){
            setIsSubmitting(false);
            
            props.showToast(`Connection error`);
        });
    };

    useEffect(() => {
        apiGetAdminGroupsNames();
    }, []);

    // JSX view
    return (
        <>
            <br />
            <div className="container-fluid">
                <h1><i className="bi bi-people"></i> Add a new user.</h1>

                <div className="row">
                    {/* <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div> */}

                    <div className="col-sm-6">
                        <form
                            onSubmit={submitForm}
                            className="card">
                            <div className="card-body">
                                <h2 className="card-subtitle mb-2 text-muted">Group details.</h2>

                                <div className="card-text">
                                    <div className="mb-3">
                                        {/* Name */}
                                        <label className="form-label" htmlFor="name">User's name*</label>
                                        <input
                                            id="name"
                                            value={name}
                                            onChange={nameChange}
                                            onBlur={nameValidate}
                                            className={`form-control ${(nameError === "") ? "" : "is-invalid"}`}
                                            type="name"
                                            placeholder="Enter user names" />

                                        <div className="invalid-feedback">
                                            {nameError}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {/* Email */}
                                        <label className="form-label" htmlFor="email">Email address*</label>
                                        <input
                                            id="email"
                                            value={email}
                                            onChange={emailChange}
                                            onBlur={emailValidate}
                                            className={`form-control ${(emailError === "") ? "" : "is-invalid"}`}
                                            type="email"
                                            placeholder="Enter email address" />

                                        <div className="invalid-feedback">
                                            {emailError}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {/* Group */}
                                        <label className="form-label" htmlFor="group">User group*</label>
                                        <select
                                            id="group"
                                            value={groupId}
                                            onChange={groupChange}
                                            onBlur={groupValidate}
                                            className={`form-select ${(groupError === "") ? "" : "is-invalid"}`}
                                            aria-label="Default select example"
                                            placeholder="Select user's group" 
                                        >
                                            <option defaultValue>Select user's group</option>
                                            {
                                                groups.map(function (group) {
                                                    return <option key={group.id} value={group.id}>{group.name}</option>
                                                })
                                            }

                                        </select>

                                        <div className="invalid-feedback">
                                            {groupError}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {/* Description */}
                                        <label className="form-label" htmlFor="description">User's description*</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={descriptionChange}
                                            onBlur={descriptionValidate}
                                            className={`form-control ${(descriptionError === "") ? "" : "is-invalid"}`}
                                            type="description"
                                            placeholder="Enter user's description"
                                            row="5"></textarea>

                                        <div className="invalid-feedback">
                                            {descriptionError}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {/* Submit button */}
                                        <button type="submit" className="btn btn-primary" disabled={(isSubmitting) ? "disabled" : ""}>
                                            {submitButtonText}

                                            <div className="app-spinner-box">
                                                <i className={(isSubmitting) ? `bi bi-arrow-clockwise app-spinner` : `bi bi-plus-circle`}></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

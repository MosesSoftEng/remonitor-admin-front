import { API_URL } from "../../environments/env";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import AuthToken from '../../utils/AuthToken'

import en from '../../lang/en'

/**
 * Create group page.
 * @returns JSX template view
 */
export default function CreateUser(props) {
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
     * group
     */
    const [group, setGroup] = useState('');

    const groupChange = function (event) {
        setGroup(event.target.value);
    };

    const [groupError, setGroupError] = useState('');
    const groupValidate = function () {
        setGroupError('');

        if (!group) {
            setGroupError('Group is required.');
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
        groupValidate();
        descriptionValidate();

        // Is validation ok
        if (nameError === '' && descriptionError === '' && name !== '') {
            setIsSubmitting(true);
        }
    }

    /*
     * API register 
     */


    // JSX view
    return (
        <>
            <br />
            <div className="container">
                <h1>Create a new Group.</h1>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <form
                            onSubmit={submitForm}
                            className="card">
                            <div className="card-body">
                                <h2 className="card-subtitle mb-2 text-muted">Fill in group details.</h2>

                                <div className="card-text">
                                    <div className="mb-3">
                                        {/* Name */}
                                        <label className="form-label" htmlFor="name">User names*</label>
                                        <input
                                            id="name"
                                            value={name}
                                            onChange={nameChange}
                                            onBlur={groupValidate}
                                            className={`form-control ${(nameError === "") ? "" : "is-invalid"}`}
                                            type="name"
                                            placeholder="Enter Group Name" />

                                        <div className="invalid-feedback">
                                            {nameError}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {/* Group */}
                                        <label className="form-label" htmlFor="group">User group*</label>
                                        <select
                                        id="group"
                                            value={group}
                                            onChange={groupChange}
                                            onBlur={nameValidate}
                                            className={`form-select ${(groupError === "") ? "" : "is-invalid"}`}
                                            aria-label="Default select example"
                                        >
                                            <option selected>Choose a group</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>

                                        <div className="invalid-feedback">
                                            {groupError}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {/* Description */}
                                        <label className="form-label" htmlFor="description">User description*</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={descriptionChange}
                                            onBlur={descriptionValidate}
                                            className={`form-control ${(descriptionError === "") ? "" : "is-invalid"}`}
                                            type="description"
                                            placeholder="Enter Group Description"
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

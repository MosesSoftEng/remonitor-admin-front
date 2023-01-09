import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { API_URL } from "../../../../environments/env";
import Loader from "../../../../components/Loader";
import _Toast from '../../../../components/Toast';
import log from '../../../../utils/log.js'

/**
 * Users/ Devices pages
 * @returns JSX template view
 */
export default function Users(props) {
    const [clients, setClients] = useState([]);

    // Toast
    const [toastMessage, setToastMessage] = useState('');
    const [isFetchingData, setIsFetchingData] = useState(false);

    const apiGetUsers = function () {
        setIsFetchingData(true);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/clients/${props.token}`, requestOptions)
            .then(function (response) {
                setIsFetchingData(false);
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setClients(data.data);
                }

                log.info('Users apiGetUsers: ', data);

                setToastMessage(data.message);
            }).catch(function (error) {
                setToastMessage(`Connection error`);
            }).finally(function () {
                setIsFetchingData(false);
            });
    }

    useEffect(() => {
        apiGetUsers();
    }, []);

    // JSX view
    return (
        <>
            <div className="container-fluid">
                <br />
                <h1>
                    <i className="bi bi-people"></i> Users.
                    <div className="btn-group float-end" role="group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Period <i className="bi bi-calendar"></i>
                        </button>

                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">Week</a></li>
                            <li><a className="dropdown-item" href="#">Month</a></li>
                            <li><a className="dropdown-item" href="#"><hr /></a></li>
                            <li>
                                <form className="dropdown-item">

                                    <label htmlFor="exampleInputEmail1" className="form-label">Start Date</label>
                                    <input type="date" className="form-control" id="exampleInputEmail1" placeholder="start date" />

                                    <br />

                                    <label htmlFor="exampleInputEmail1" className="form-label">End Date</label>
                                    <input
                                        id="endDate"
                                        type="date" aria-label="First name" className="form-control" placeholder="start date" />

                                    <br />

                                    <div className="float-end">
                                        <button className="btn btn-primary" type="submit">Apply</button>
                                    </div>
                                </form>

                            </li>
                        </ul>
                    </div>
                </h1>

                <div className="row">
                    <div className="col-sm-6">
                        {isFetchingData ? <Loader show={isFetchingData} /> :
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />

                                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                                        <a href="/dash/users/create" className="btn btn-outline-primary"><i className="bi bi-plus-circle"></i> add</a>
                                        <button type="button" className="btn btn-outline-primary"><i className="bi bi-trash"></i></button>
                                    </div>
                                </li>

                                {clients.map((client) => (
                                    <li key={client.id} className="list-group-item d-flex justify-content-between align-items-start">
                                        <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                <Link to={`/dash/user/user/summary`} state={{ client: client }}>
                                                    {client.name} | {client.email}
                                                </Link>
                                            </div>


                                            <small>{client.description}</small>

                                            <br />

                                            Group: {client.groupId}

                                            <br />

                                            email: {client.email} | passkey: {client.paswordResetCode}
                                        </div>

                                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                                            <a href="/dash/groups/create" className="btn btn-outline-primary"><i className="bi bi-pencil-square"></i></a>
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-trash"></i></button>
                                        </div>
                                    </li>
                                ))}

                                {clients.length === 0 ?
                                    <li className="list-group-item text-center">
                                        <i>No users found</i>
                                        <br />
                                        <a href="/dash/users/create" className="btn btn-outline-primary"><i className="bi bi-plus-circle"></i> add first user.</a>
                                    </li>
                                    : ''}

                                <li className="list-group-item">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                            <a className="page-link">Previous</a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>

            <_Toast toastMessage={toastMessage} setToastMessage={setToastMessage} />
        </>
    );
};

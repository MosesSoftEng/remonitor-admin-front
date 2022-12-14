import { API_URL } from "../../environments/env";

import { useEffect, useState } from 'react';

import LoaderUIComp from "../../components/LoaderUIComp";

/**
 * Dashboard Groups page.
 * @returns JSX template view
 */
export default function Users(props) {
    const [clients, setClients] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);

    const apiGetUsers = function () {
        setFetchingData(true);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/clients/${props.token}`, requestOptions)
            .then(function (response) {
                setFetchingData(false);
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setClients(data.data);
                }
            }).catch(function (error) {
                props.showToast(`Connection error`);
            });
    }

    useEffect(() => {
        apiGetUsers();
    }, []);

    // JSX view
    return (
        <>
            <br />
            <div className="container">
                <h1>Users</h1>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Users' summary.</h5>
                                <p className="card-text">
                                    <button type="button" className="btn btn-info">
                                        Total users <span className="badge text-bg-secondary">1</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-8">

                        {isFetchingData ? <LoaderUIComp show={isFetchingData} /> :
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
                                                <a href={`/dash/user/user/` + JSON.stringify(client) + '/summary'}>{client.name} | {client.email}</a>
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
        </>
    );
};

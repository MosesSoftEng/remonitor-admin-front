import { NavLink, Outlet, useParams } from "react-router-dom";

export default function User() {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

    return (
        <>
            <br />
            <div className="container">
                <h1>User: {client.name}</h1>

                <div className="row">
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">

                                </h5>

                                <p className="card-text">
                                    Group:<br />
                                    {client.groupId}<br />
                                    <br />

                                    email:<br />
                                    {client.email} <br />
                                    <br />

                                    passkey:<br />
                                    {client.paswordResetCode}<br />
                                    <br />

                                    <small>{client.description}</small>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-9">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Summary</a>
                            </li>

                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/${JSON.stringify(client)}/keypresses`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }}>
                                    Keypresses
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Screenshots</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Sessions</a>
                            </li>
                        </ul>

                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

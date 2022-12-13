import { NavLink, Outlet, useParams } from "react-router-dom";

export default function UserLayout() {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

    return (
        <>
            <br />
            <div className="container">
                <h1>User: {client.name}</h1>

                <div className="row">
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/${JSON.stringify(client)}/summary`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }}>
                                    Summary
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/${JSON.stringify(client)}/keypresses`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }}>
                                    Keypresses
                                </NavLink>
                            </li>

                            
                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/${JSON.stringify(client)}/screenshots`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }}>
                                    Screenshots
                                </NavLink>
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

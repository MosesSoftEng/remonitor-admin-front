import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function UserLayout() {
    const location = useLocation();
    const { client } = location.state;

    return (
        <>
            <br />
            <div className="container">
                <h1>User: {client.name}</h1>

                <div className="row">
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/summary`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }} state={{ client: client }}>
                                    Summary
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/keypresses`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }} state={{ client: client }}>
                                    Keypresses
                                </NavLink>
                            </li>

                            
                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/screenshots`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }} state={{ client: client }}>
                                    Screenshots
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink end to={`/dash/user/user/sessions`} className={function ({ isActive }) {
                                    return (isActive) ? "nav-link active" : "nav-link"
                                }} state={{ client: client }}>
                                    Sessions
                                </NavLink>
                            </li>
                        </ul>

                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

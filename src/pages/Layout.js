/**
 * Master template layout
 * @returns JSX template view
 */

import environment from "../environments/environment";

import { Outlet } from "react-router-dom";

// Boostrap imports
import { Offcanvas } from 'bootstrap'

export default function Layout() {
export default function Layout(props) {
    // Setup OffCanvas
    const offcanvasElementList = document.querySelectorAll('#offcanvasNavbar')
    const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new Offcanvas(offcanvasEl))

    // JSX view
    return (
        <>
            <nav className="navbar bg-light border-bottom border-primary">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a className="navbar-brand" href="/">{APP_NAME}</a>

                    <div>
                    {props.token? '': <div>
                        <a className="btn btn-primary" href="/login" role="button">
                            <i className="bi bi-box-arrow-right"></i> Login
                        </a>

                        <a className="btn" href="/register" role="button">
                            <i className="bi bi-pen"></i> register
                        </a>
                    </div>

                </div>
            </nav>

            {/* <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
            </div> */}

            {/* OffCanvas Navbar */}
            <div className="offcanvas offcanvas-start border-right border-primary" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" data-bs-backdrop="false" >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"><i className="bi bi-house"></i> Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="bi bi-box-arrow-right"></i> Login</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="bi bi-pen"></i> Register</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Renders the current route */}
            <Outlet />
        </>
    );
};

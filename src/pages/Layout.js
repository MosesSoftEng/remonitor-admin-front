
import { APP_NAME, API_URL } from "../environments/env";

import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

// Boostrap imports
import { Offcanvas } from 'bootstrap'

/**
 * React function component defines master template layout
 * @param {*} props passed parameters
 * @returns JSX
 */
export default function Layout(props) {
  /*
   * Setup OffCanvas
   */
  const [offCanvasNavBar, setOffCanvasNavBar] = useState(null);
  const [collapseOffCanvasNavBar, SetCollapseOffCanvasNavBar] = useState(false);

  useEffect(() => {
    setOffCanvasNavBar(new Offcanvas(document.getElementById('offcanvasNavbar')));
  }, []);

  // Events
  useEffect(() => {
    if (offCanvasNavBar !== null) {
      offCanvasNavBar._element.addEventListener('shown.bs.offcanvas', () => {
        SetCollapseOffCanvasNavBar(true);
      });

      offCanvasNavBar._element.addEventListener('hidden.bs.offcanvas', () => {
        SetCollapseOffCanvasNavBar(false);
      });
    }
  }, [offCanvasNavBar]);


  /*
   * Logout
   */
  const [isLogingOut, setIsLogingOut] = useState(false);

  const logout = function () {
    setIsLogingOut(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": props.token,
      }),
      redirect: 'follow'
    };

    fetch(`${API_URL}/logout`, requestOptions)
      .then(function (response) {
        setIsLogingOut(false);

        if (response.ok) {
          props.deleteToken();
        }

        return response.text();
      })
      .then((data) => {
        // Delete token to localstorage
        console.log('logout data: ', data);

      }).catch(function (error) {
        // showToast('Connection error.');
      });
  };

  // JSX view
  return (
    <>
      {/* TODO: Navigation Bar convert to component */}
      <nav className="navbar fixed-top bg-light border-bottom border-primary zindex-toast" style={{ zIndex: 1090 }}>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <a className="navbar-brand" href="/">{APP_NAME}</a>

        <div>
          {props.token ?
            <>
              <a className="btn btn-primary" href="#" role="button" onClick={logout}>
                Logout

                <div className="app-spinner-box">
                  <i className={(isLogingOut) ? "bi bi-arrow-clockwise app-spinner" : "bi bi-box-arrow-right"}></i>
                </div>
              </a>
            </>
            :
            <>
              <a className="btn btn-primary" href="/login" role="button">
                Login <i className="bi bi-box-arrow-right"></i>
              </a>

              <a className="btn" href="/register" role="button">
                register <i className="bi bi-pen"></i>
              </a>
            </>}
        </div>
      </nav>

      {/* <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
            </div> */}

      {/* TODO: OffCanvas Navbar convert to component*/}
      <div
        id="offcanvasNavbar"
        className="offcanvas offcanvas-start border-right border-primary" tabIndex="-1" aria-labelledby="offcanvasNavbarLabel"
        data-bs-scroll="true"
        data-bs-backdrop="false">
        {/* <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        </div> */}

        <div className="offcanvas-body">
          <ul className="nav nav nav-pills flex-column">
            {props.token ?
              <>
                <li className="nav-item">
                  <NavLink end to="dash" className={function ({ isActive }) {
                    return ((isActive) ? "nav-link active" : "nav-link") + ((collapseOffCanvasNavBar) ? ' app-offcanvas-center-text' : '')
                  }}>
                    <i className="bi bi-speedometer2"></i>
                    <span className={(collapseOffCanvasNavBar) ? 'app-offcanvas-hide-text' : ''}> Dash</span>
                  </NavLink>
                </li>

                <li><hr /></li>

                <li className="nav-item">
                  <NavLink end to="dash/groups" className={function ({ isActive }) {
                    return ((isActive) ? "nav-link active" : "nav-link") + ((collapseOffCanvasNavBar) ? ' app-offcanvas-center-text' : '')
                  }}>
                    <i className="bi bi-collection"></i>
                    <span className={(collapseOffCanvasNavBar) ? 'app-offcanvas-hide-text' : ''}> Groups</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="dash/groups/create" className={function ({ isActive }) {
                    return ((isActive) ? "nav-link active" : "nav-link") + ((collapseOffCanvasNavBar) ? ' app-offcanvas-center-text' : '')
                  }}>
                    <i className="bi bi-plus-circle"></i>
                    <span className={(collapseOffCanvasNavBar) ? 'app-offcanvas-hide-text' : ''}> Add Group</span>
                  </NavLink>
                </li>

                <li><hr /></li>

                <li className="nav-item">
                  <NavLink end to="dash/users" className={function ({ isActive }) {
                    return ((isActive) ? "nav-link active" : "nav-link") + ((collapseOffCanvasNavBar) ? ' app-offcanvas-center-text' : '')
                  }}>
                    <i className="bi bi-people"></i>
                    <span className={(collapseOffCanvasNavBar) ? 'app-offcanvas-hide-text' : ''}> Users</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink end to="dash/users/create" className={function ({ isActive }) {
                    return ((isActive) ? "nav-link active" : "nav-link") + ((collapseOffCanvasNavBar) ? ' app-offcanvas-center-text' : '')
                  }}>
                    <i className="bi bi-person-plus"></i>
                    <span className={(collapseOffCanvasNavBar) ? 'app-offcanvas-hide-text' : ''}> Add User</span>
                  </NavLink>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home <i className="bi bi-house"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Login <i className="bi bi-box-arrow-right"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Register <i className="bi bi-pen"></i>
                  </a>
                </li>
              </>
            }

          </ul>
        </div>
      </div>

      <div className="app-nav">
        a
      </div>

      <div className={(collapseOffCanvasNavBar) ? 'app-content-collapsed-nav' : 'app-content-uncollapsed-nav'}>
        <br />
        {/* Renders the current route */}
        <Outlet />
      </div>
    </>
  );
};

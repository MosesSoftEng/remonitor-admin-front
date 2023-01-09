/**
 *  Main app Component 
 */

// Import SASS
import './styles/App.scss';

// Import routes dependencies
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dash from './pages/Dash';

import DashAdminGroups from './pages/dash/admin/groups/Groups';
import DashAdminGroupCreate from './pages/dash/admin/groups/Create';

import UserLayout from './pages/dash/User/UserLayout';
import ClientKeyPressesPage from './pages/dash/User/UserKeyPressesPage';

import AuthToken from './services/AuthToken'


// Boostrap imports
import { Toast } from 'bootstrap';
import Users from './pages/users/Users';
import CreateUser from './pages/users/CreateUser';
import Screenshots from './pages/dash/User/UserScreenshotsPage';
import UserSummary from './pages/dash/User/UserSummaryPage';
import Sessions from './pages/dash/User/UserSessionsPage';

function App() {
    /* Logic */
    // Call function component and destrucutring it's return object.
    const { token, saveToken, deleteToken } = AuthToken();

    /* Toast */
    // Setup Toast
    const [toast, setToast] = useState(null);

    // After JSX has rendered.
    useEffect(() => {
        setToast(new Toast(document.getElementById('toast')));
    }, []);

    const [toastMessage, setToastMessage] = useState('test');

    const showToast = function (message) {
        setToastMessage(message);

        toast.show();
    };

    // Redirect
    const [redirectURL, setRedirectURL] = useState('/dash');

    /* JSX */
    return (
        <>
            <BrowserRouter>
                {/* Route Group */}
                <Routes>
                    {/* Parent Route */}
                    <Route path="/" element={<Layout token={token} deleteToken={deleteToken} />}>
                        {/* Default route set using index attribute */}
                        <Route index element={<Home />} />
                        <Route path="home" element={<Home />} />

                        {/* Normal path */}
                        <Route path="dash" element={<Dash token={token} />} ></Route>

                        <Route path="dash/groups" element={<DashAdminGroups token={token} showToast={showToast} setRedirectURL={setRedirectURL}/>} />
                        <Route path="dash/groups/create" element={<DashAdminGroupCreate showToast={showToast} />} />

                        <Route path="dash/group" element={<DashAdminGroupCreate showToast={showToast} />} />

                        {/* Users */}
                        <Route path="dash/users" element={<Users token={token} showToast={showToast} />} />
                        <Route path="dash/users/create" element={<CreateUser token={token} showToast={showToast} />} />

                        {/* User */}
                        <Route path="dash/user/user/" element={<UserLayout token={token} />} >
                            <Route path="summary" element={<UserSummary token={token} showToast={showToast} />} />
                            <Route path="keypresses" element={<ClientKeyPressesPage token={token} showToast={showToast} />} />
                            <Route path="screenshots" element={<Screenshots token={token} showToast={showToast} deleteToken={deleteToken} />} />
                            <Route path="sessions" element={<Sessions token={token} showToast={showToast} />} />
                        </Route>

                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login saveToken={saveToken} redirectURL={redirectURL}/>} />

                        {/* Undefined URLs */}
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>

            {/* TODO: Turn toast to a component*/}
            <div id="toast" className="toast align-items-center text-white bg-primary border-0 position-absolute bottom-0 end-0 m-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {toastMessage}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </>
    );
}

/**
 * Export function App()
 *  Default - make this the only export.
 */
export default App;

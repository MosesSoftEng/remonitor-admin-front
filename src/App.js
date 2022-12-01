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
import Register from './pages/Register'
import Login from './pages/Login'
import Dash from './pages/Dash';
import Groups from './pages/Dash/Groups';

import AuthToken from './utils/AuthToken'
import CreateGroup from './pages/Groups/Create';

// Boostrap imports
import { Toast } from 'bootstrap'

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
                        <Route path="dash/groups" element={<Groups />} />
                        <Route path="dash/group/create" element={<CreateGroup showToast={showToast} />} />

                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login saveToken={saveToken} />} />

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

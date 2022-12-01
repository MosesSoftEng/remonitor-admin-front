/**
 *  Main app Component 
 */

// Import SASS
import './styles/App.scss';

// Import routes dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Register from './pages/Register'
import Login from './pages/Login'
import Dash from './pages/Dash';

import AuthToken from './utils/AuthToken'

function App() {
    /* Logic */
    // Call function component and destrucutring it's return object.
    const { token, saveToken, deleteToken } = AuthToken();

    /* JSX */
    return (
        <>
            <BrowserRouter>
                {/* Route Group */}
                <Routes>
                    {/* Parent Route */}
                    <Route path="/" element={<Layout token={token} deleteToken={deleteToken}/>}>
                        {/* Default route set using index attribute */}
                        <Route index element={<Home />} />
                        <Route path="home" element={<Home />} />

                        {/* Normal path */}
                        <Route path="dash" element={<Dash />} />

                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login saveToken={saveToken}/>} />

                        {/* Undefined URLs */}
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

/**
 * Export function App()
 *  Default - make this the only export.
 */
export default App;

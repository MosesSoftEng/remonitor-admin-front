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

function App() {
    // Logic
    // JSX
    return (
        <BrowserRouter>
            {/* Route Group */}
            <Routes>
                {/* Parent Route */}
                <Route path="/" element={<Layout />}>
                    {/* Default route set using index attribute */}
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />

                    {/* Normal path */}
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />

                    {/* Undefined URLs */}
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

/**
 * Export function App()
 *  Default - make this the only export.
 */
export default App;

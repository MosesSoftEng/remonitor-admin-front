import { useNavigate } from "react-router-dom"
import AuthToken from '../utils/AuthToken'

/**
 * Dashboard page.
 * @returns JSX template view
 */
export default function Dash(props) {
    const navigate = useNavigate();
    const { token } = AuthToken();

    // Reidrect user to register if not logged in.
    if (token === null) {
        navigate('/register');
    }

    // JSX view
    return (
        <>
            <h1>Dash</h1>
        </>
    );
};

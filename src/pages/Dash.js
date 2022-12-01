import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

/**
 * Home page
 * @returns JSX template view
 */
export default function Dash(props) {
    const navigate = useNavigate();

    useEffect(() => {
        // Reidrect user to register if not logged in.
        if (props.token === null) {
            navigate('/register');
        }
    }, [navigate, props]);

    // JSX view
    return (
        <>
            <h1>Dash</h1>
        </>
    );
};

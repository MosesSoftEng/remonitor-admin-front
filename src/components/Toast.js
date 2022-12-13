import { useState, useEffect } from 'react';
import { Toast } from 'bootstrap';

/**
 * Module to show toast
 * @returns JSX UI
 */
export default function _Toast(props) {
        /* Toast */
    // Setup Toast
    const [toast, setToast] = useState(null);

    // After JSX has rendered.
    useEffect(() => {
        setToast(new Toast(document.getElementById('toast')));
    }, []);

    return (
        <>
            {/* TODO: Turn toast to a component*/}
            <div id="toast" className="toast align-items-center text-white bg-primary border-0 position-absolute bottom-0 end-0 m-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {props.toastMessage}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </>
    );
}

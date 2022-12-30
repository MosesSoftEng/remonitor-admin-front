import { useState, useEffect } from 'react';
import { Toast } from 'bootstrap';

/**
 * _Toast - Functional component to show toasts.
 *
 * @returns JSX UI
 */
export default function _Toast(props) {
  // Setup Toast
  const [toast, setToast] = useState(null);

  // Setup Toast
  useEffect(() => {
    setToast(new Toast(document.getElementById('toast')));
  }, []);

  // Show Toast
  useEffect(() => {
    if (props.toastMessage !== '') {
      toast.show();
    }
  }, [toast, props.toastMessage]);

  // Add event to toast
  useEffect(() => {
    if (toast !== null) {
      toast._element.addEventListener('hidden.bs.toast', () => {
        props.setToastMessage('');
      })
    }
  }, [toast]);

  return (
    <>
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

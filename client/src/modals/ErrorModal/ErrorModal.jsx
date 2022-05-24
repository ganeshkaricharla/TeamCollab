import './ErrorModal.css'

function ErrorModal({ error, close }) {
    // console.log(error)
    return (
        <div className="error-modal">
            <div
                className={`error-modal-dialog ${
                    error.type === 'success' ? 'error-green' : 'error-red'
                }`}
            >
                <i className="error-close-button" onClick={close}>
                    &times;
                </i>
                <p className="error-modal__message">{error.message}</p>
            </div>
        </div>
    )
}

export default ErrorModal

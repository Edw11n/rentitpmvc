import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/modals.css'; 
import SuccessModalController from '../../controllers/sucessmodalController'; 

function SuccessModal({ message }) {
    const { goToLogin } = SuccessModalController(); // Utiliza el controlador

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                <h2>{message}</h2>
                <p>El proceso se ha realizado correctamente. Puede continuar iniciando sesión.</p>
                <button onClick={goToLogin}>Ir al login</button>
            </div>
        </div>
    );
}

export default SuccessModal;

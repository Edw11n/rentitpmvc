import React from "react";
import '../../styles/modals.css';
import AccountController from '../../controllers/accountController';

function Account({ onClose }) {
    const {
        user,
        showConfirmLogout,
        goToDashboard,
        handleLogoutClick,
        confirmLogout,
        cancelLogout,
    } = AccountController(onClose); // Utiliza el controlador

    if (!user) {
        return null;
    }

    return (
        <div className="account">
            <div className="account-container">
                <h2>Información de la cuenta</h2>
                <p className="role">ARRENDADOR</p>
                <p className='go-to-dashboard' onClick={goToDashboard}>Panel de gestión</p>
                <div className="user-info">
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                    <p><strong>Apellido:</strong> {user.apellido}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>Teléfono:</strong> {user.telefono}</p>
                </div>
                <button onClick={handleLogoutClick} className="logout-button">Cerrar sesión</button>

                {/* mostrar el diálogo de confirmación */}
                {showConfirmLogout && (
                    <div className="confirm-logout-dialog">
                        <p>¿Estás seguro de que deseas cerrar sesión?</p>
                        <div className="confirm-logout-actions">
                            <button onClick={confirmLogout} className="logout-confirm-btn">Sí</button>
                            <button onClick={cancelLogout} className="logout-cancel-btn">No</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Account;

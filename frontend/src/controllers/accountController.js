import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

const AccountController = (onClose) => {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const [showConfirmLogout, setShowConfirmLogout] = useState(false); // Estado para controlar la confirmación de cerrar sesión

    const goToDashboard = () => {
        navigate('/dashboard');
        onClose();
    };

    const handleLogoutClick = () => {
        setShowConfirmLogout(true); // Mostrar la confirmación al hacer clic en cerrar sesión
    };

    const confirmLogout = () => {
        logout();
        setShowConfirmLogout(false); // Cerrar la confirmación
        navigate('/');
    };

    const cancelLogout = () => {
        setShowConfirmLogout(false); // Ocultar la confirmación si se cancela
    };

    return {
        user,
        showConfirmLogout,
        goToDashboard,
        handleLogoutClick,
        confirmLogout,
        cancelLogout,
        setShowConfirmLogout,
    };
};

export default AccountController;

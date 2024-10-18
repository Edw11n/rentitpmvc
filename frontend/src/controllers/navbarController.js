import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const NavbarController = (setShowAccount, goToJoin) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const goToHome = () => {
        navigate('/');
    };

    const handleUserClick = () => {
        setShowAccount(prev => !prev);
    };

    return {
        user,
        goToHome,
        handleUserClick,
        goToJoin,
    };
};

export default NavbarController;

import { useNavigate } from 'react-router-dom';

const SuccessModalController = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    return {
        goToLogin,
    };
};

export default SuccessModalController;

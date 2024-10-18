import { useNavigate } from "react-router-dom";

const JoinController = (onClose) => {
    const navigate = useNavigate();

    const goToSignup = () => {
        navigate('/signup');
        onClose();
    };

    const goToLogin = () => {
        navigate('/login');
        onClose();
    };

    return {
        goToSignup,
        goToLogin,
    };
};

export default JoinController;

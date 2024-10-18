import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../controllers/loginController'; // Importa el controlador
import { UserContext } from "../../contexts/UserContext";
import '../../styles/log.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser({ email, password, setUser });
        if (result.success) {
            console.log('Login exitoso');
            goToHome();
        } else {
            setMessage(result.message);
        }
    };

    return (
        <div className="container">
            <div className="exit-icon" onClick={goToHome}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="div-container">
                <div className="title">
                    <h2>Inicia sesión en CampusHousing</h2>
                </div>
                <div className="form-container">
                    <div>
                        <input 
                            type="email" 
                            placeholder="Correo electrónico"
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit}>Entrar</button>
                    {message && <p className="error-message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;

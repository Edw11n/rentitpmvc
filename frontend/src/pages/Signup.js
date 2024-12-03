import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SucessModal from '../components/SuccessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/log.css';
import { signupUser } from '../apis/signupController'; // Importa el controlador

function Signup() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [showSucess, setShowSucess] = useState(false);
    const [error, setError] = useState(false);
    const [userType, setUserType] = useState(""); // Estado para almacenar el tipo de usuario
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const handleChangeUser = (e) => {
        setUserType(e.target.value); // Actualiza el tipo de usuario seleccionado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(true);
            setMensaje("Las contraseñas no coinciden");
            return;
        }

        // Asigna el rol basado en la selección de userType
        let rolId = 2; // Default: arrendador
        if (userType === "usuario") {
            rolId = 1; // Si es usuario, rolId es 1
        }

        // Verifica que al menos un rol esté seleccionado
        if (!userType) {
            setError(true);
            setMensaje("Por favor selecciona un tipo de usuario.");
            return;
        }

        const result = await signupUser({ nombre, apellido, email, telefono, password, rolId });
        if (result.success) {
            setShowSucess(true);
        } else {
            setMensaje(result.message);
            setError(true);
        }
    };

    const handleSuccessClose = () => {
        setShowSucess(false);
        navigate('/login');
    }

    return (
        <div className="container">
            <FontAwesomeIcon icon={faTimes} className="exit-icon" onClick={goToHome} />
            <div className="div-container">
                <div className="title">
                    <h2>Regístrate</h2>
                </div>
                <input type="text" placeholder="Nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="text" placeholder="Apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} />
                <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Teléfono" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirmar contraseña" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                
                <div className="radio-container">
                    <label>
                        <input
                            type="radio"
                            value="usuario"
                            checked={userType === 'usuario'}
                            onChange={handleChangeUser}
                        />
                        Usuario
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="arrendador"
                            checked={userType === 'arrendador'}
                            onChange={handleChangeUser}
                        />
                        Arrendador
                    </label>
                </div>         
                <button onClick={handleSubmit}>Registrarse</button>              
                {error && <p style={{ color: 'red' }}>{mensaje}</p>} 
                <div>
                    {showSucess && <SucessModal message={'Registro Exitoso.'} goToLogin={handleSuccessClose} />}
                </div>
            </div>
        </div>
    );
}

export default Signup;

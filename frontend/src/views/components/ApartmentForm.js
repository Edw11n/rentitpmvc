import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ApartmentFormController from '../../controllers/apartmentformController'; 
import '../../styles/apartments.css';

function ApartmentForm() {
    const { user } = useContext(UserContext);
    const [controller] = useState(new ApartmentFormController(user)); // Inicializa el controlador
    const [barrio, setBarrio] = useState('');
    const [direccion, setDireccion] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [addInfo, setAddInfo] = useState('');
    const [charCount, setCharCount] = useState(0); // Estado para contar caracteres
    const [message, setMessage] = useState(''); // Para mostrar mensajes

    const handleSubmit = async () => {
        controller.setApartmentData({ barrio, direccion, latitud, longitud, addInfo });
        try {
            const successMessage = await controller.submitApartment();
            setMessage(successMessage);
            // Limpiar formulario después de enviar
            setBarrio('');
            setDireccion('');
            setLatitud('');
            setLongitud('');
            setAddInfo('');
            setCharCount(0); // Reiniciar el contador de caracteres
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleAddInfoChange = (e) => {
        const value = e.target.value;
        setAddInfo(value);
        setCharCount(value.length); // Actualizar el número de caracteres
    };

    return (
        <div className='apartment-form-container'>
            <h2>Añadir Apartamento</h2>
            {message && <p className="message">{message}</p>}
            <div className="form-group">
                <label htmlFor="barrio">Barrio</label>
                <input
                    type="text"
                    id="barrio"
                    placeholder="Barrio"
                    value={barrio}
                    onChange={(e) => setBarrio(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Coordenadas</label>
                <div className="input-inline">
                    <div className='input-inline'>
                        <input
                            type="text"
                            id="latitud"
                            placeholder="Latitud"
                            value={latitud}
                            onChange={(e) => setLatitud(e.target.value)}
                        />
                    </div>
                    <div className='input-inline'>
                        <input
                            type="text"
                            id="longitud"
                            placeholder="Longitud"
                            value={longitud}
                            onChange={(e) => setLongitud(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="addInfo">
                    Información adicional ({charCount}/500 caracteres Max.)
                </label>
                <textarea
                    id="addInfo"
                    placeholder="Información adicional de la publicación"
                    value={addInfo}
                    onChange={handleAddInfoChange}
                    maxLength="500"
                    rows="5" // Definir la altura del textarea
                    className="textarea-field" // Asignar clase CSS para ajustar el estilo
                />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
                Añadir Apartamento
            </button>
        </div>
    );
}

export default ApartmentForm;

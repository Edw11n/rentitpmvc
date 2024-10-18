import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useManageController from '../../controllers/manageController'; // Importa el controlador
import '../../styles/manage.css';

function Manage() {
    const navigate = useNavigate();
    const {
        loading,
        apartmentList,
        fetchApartments,
        editApartmentId,
        setEditApartmentId,
        editFormData,
        handleEditClick,
        handleInputChange,
        handleDelete,
        handleUpdate,
        handleCancelEdit,
    } = useManageController(navigate); // Utiliza el controlador

    useEffect(() => {
        fetchApartments();
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <div className="manage-container">
            {loading ? (
                <p>Cargando apartamentos...</p>
            ) : (
                <div>
                    <h2>Mis Apartamentos</h2>
                    <button className="refresh-btn" onClick={fetchApartments}>Actualizar</button>
                    {apartmentList.length === 0 ? (
                        <p>No hay apartamentos disponibles para editar.</p>
                    ) : (
                        <div className="apartment-list">
                            {apartmentList.map((apartment) => (
                                <div key={apartment.id_apartamento} className="apartment-item">
                                    {editApartmentId === apartment.id_apartamento ? (
                                        <div className="edit-apartment-form">
                                            <input 
                                                type="text" 
                                                name="barrio_apartamento" 
                                                value={editFormData.barrio_apartamento} 
                                                onChange={handleInputChange} 
                                                placeholder="Barrio" 
                                            />
                                            <input 
                                                type="text" 
                                                name="direccion_apartamento" 
                                                value={editFormData.direccion_apartamento} 
                                                onChange={handleInputChange} 
                                                placeholder="Dirección" 
                                            /> 
                                            <input 
                                                type="text" 
                                                name="latitud_apartamento" 
                                                value={editFormData.latitud_apartamento} 
                                                onChange={handleInputChange} 
                                                placeholder="Latitud" 
                                            />
                                            <input 
                                                type="text" 
                                                name="longitud_apartamento" 
                                                value={editFormData.longitud_apartamento} 
                                                onChange={handleInputChange} 
                                                placeholder="Longitud" 
                                            />
                                            <textarea 
                                                className="edit-form-textarea" 
                                                name="info_adicional_apartamento" 
                                                value={editFormData.info_adicional_apartamento} 
                                                onChange={handleInputChange} 
                                                placeholder="Información adicional"
                                            />
                                            <div className="edit-buttons"> 
                                                <button className="update-btn" onClick={() => handleUpdate(apartment.id_apartamento)}>Actualizar</button>
                                                <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="apartment-details">
                                                <p><strong>Barrio:</strong> {apartment.barrio_apartamento}</p>
                                                <p><strong>Dirección:</strong> {apartment.direccion_apartamento}</p>
                                                <p><strong>Latitud:</strong> {apartment.latitud_apartamento}</p>
                                                <p><strong>Longitud:</strong> {apartment.longitud_apartamento}</p>
                                                <p><strong>Información adicional:</strong> {apartment.info_adicional_apartamento}</p>
                                            </div>
                                            <div className="action-buttons">
                                                <button className="edit-btn" onClick={() => handleEditClick(apartment)}>Editar</button>
                                                <button className="delete-btn" onClick={() => handleDelete(apartment.id_apartamento)}>Eliminar</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Manage;

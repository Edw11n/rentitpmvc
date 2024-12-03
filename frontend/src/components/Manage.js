import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useManageController from '../apis/manageController'; // Importa el controlador
import '../styles/manage.css';

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
                        <b>No hay apartamentos disponibles para editar.</b>
                    ) : (
                        <div className="apartment-list">
                            {apartmentList.map((apartment) => (
                                <div key={apartment.id_apt} className="apartment-item">
                                    {editApartmentId === apartment.id_apt ? (
                                        <div className="edit-apartment-form">
                                            <input 
                                                type="text" 
                                                name="barrio" 
                                                value={editFormData.barrio} 
                                                onChange={handleInputChange} 
                                                placeholder="Barrio" 
                                            />
                                            <input 
                                                type="text" 
                                                name="direccion_apt" 
                                                value={editFormData.direccion_apt} 
                                                onChange={handleInputChange} 
                                                placeholder="Dirección" 
                                            /> 
                                            <input 
                                                type="text" 
                                                name="latitud_apt" 
                                                value={editFormData.latitud_apt} 
                                                onChange={handleInputChange} 
                                                placeholder="Latitud" 
                                            />
                                            <input 
                                                type="text" 
                                                name="longitud_apt" 
                                                value={editFormData.longitud_apt} 
                                                onChange={handleInputChange} 
                                                placeholder="Longitud" 
                                            />
                                            <textarea 
                                                className="edit-form-textarea" 
                                                name="info_add_apt" 
                                                value={editFormData.info_add_apt} 
                                                onChange={handleInputChange} 
                                                placeholder="Información adicional"
                                            />
                                            <div className="edit-buttons"> 
                                                <button className="update-btn" onClick={() => handleUpdate(apartment.id_apt)}>Actualizar</button>
                                                <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="apartment-details">
                                                <p><strong>Barrio:</strong> {apartment.barrio}</p>
                                                <p><strong>Dirección:</strong> {apartment.direccion_apt}</p>
                                                <p><strong>Latitud:</strong> {apartment.latitud_apt}</p>
                                                <p><strong>Longitud:</strong> {apartment.longitud_apt}</p>
                                                <p><strong>Información adicional:</strong> {apartment.info_add_apt}</p>
                                            </div>
                                            <div className="action-buttons">
                                                <button className="edit-btn" onClick={() => handleEditClick(apartment)}>Editar</button>
                                                <button className="delete-btn" onClick={() => handleDelete(apartment.id_apt)}>Eliminar</button>
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

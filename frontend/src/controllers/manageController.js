import { useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../contexts/UserContext";

const useManageController = (navigate) => {
    const [loading, setLoading] = useState(true);
    const [apartmentList, setApartmentList] = useState([]);
    const { user } = useContext(UserContext);
    const [editApartmentId, setEditApartmentId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        direccion_apartamento: "",
        barrio_apartamento: "",
        latitud_apartamento: "",
        longitud_apartamento: "",
        info_adicional_apartamento: "",
    });

    const fetchApartments = () => {
        setLoading(true);
        Axios.get(`http://localhost:3001/apartments/manage?email=${user.email}`)
            .then((response) => {
                setApartmentList(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error cargando apartamentos:', error);
                setLoading(false);
            });
    };

    const handleEditClick = (apartment) => {
        setEditApartmentId(apartment.id_apartamento);
        setEditFormData({
            direccion_apartamento: apartment.direccion_apartamento,
            barrio_apartamento: apartment.barrio_apartamento,
            latitud_apartamento: apartment.latitud_apartamento,
            longitud_apartamento: apartment.longitud_apartamento,
            info_adicional_apartamento: apartment.info_adicional_apartamento,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleDelete = (id_apartamento) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este apartamento?")) {
            Axios.delete(`http://localhost:3001/apartments/delete/${id_apartamento}`)
                .then(() => {
                    alert("Apartamento eliminado exitosamente");
                    setApartmentList(apartmentList.filter(apartment => apartment.id_apartamento !== id_apartamento));
                })
                .catch((error) => {
                    console.error('Error eliminando apartamento:', error);
                    alert('Hubo un problema al eliminar el apartamento');
                });
        }
    };

    const handleUpdate = (id_apartamento) => {
        if (!editFormData.direccion_apartamento || !editFormData.barrio_apartamento || 
            !editFormData.latitud_apartamento || !editFormData.longitud_apartamento || 
            !editFormData.info_adicional_apartamento) {
            alert('Por favor rellena los campos');
            return;
        }
        
        Axios.put(`http://localhost:3001/apartments/update/${id_apartamento}`, editFormData)
            .then(() => {
                alert("Apartamento actualizado exitosamente");
                setApartmentList(apartmentList.map(apartment => 
                    apartment.id_apartamento === id_apartamento ? { ...apartment, ...editFormData } : apartment
                ));
            })
            .catch((error) => {
                console.error('Error actualizando apartamento:', error);
                alert('Hubo un problema al actualizar el apartamento');
            });

        setEditApartmentId(null); // Finaliza la edición
    };

    const handleCancelEdit = () => {
        setEditApartmentId(null); // Finaliza la edición sin guardar cambios
    };

    return {
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
    };
};

export default useManageController;

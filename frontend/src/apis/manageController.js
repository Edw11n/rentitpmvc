import { useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../contexts/UserContext";

const useManageController = () => {
    const [loading, setLoading] = useState(true);
    const [apartmentList, setApartmentList] = useState([]);
    const { user } = useContext(UserContext);
    const [editApartmentId, setEditApartmentId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        direccion_apt: "",
        barrio: "",
        latitud_apt: "",
        longitud_apt: "",
        info_add_apt: "",
    });

    const fetchApartments = () => {
        if (!user || !user.id) {
            alert("El usuario no ha iniciado sesión.");
            return;
        }
        setLoading(true);
        Axios.get(`http://localhost:3001/apartments/manage?id=${user.id}`)
            .then((response) => {
                setApartmentList(response.data);
            })
            .catch((error) => {
                console.error('Error cargando apartamentos:', error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEditClick = (apartment) => {
        setEditApartmentId(apartment.id_apt);
        setEditFormData({
            direccion_apt: apartment.direccion_apt,
            barrio: apartment.barrio,
            latitud_apt: apartment.latitud_apt,
            longitud_apt: apartment.longitud_apt,
            info_add_apt: apartment.info_add_apt,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleDelete = (id_apt) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este apartamento?")) {
            Axios.delete(`http://localhost:3001/apartments/delete/${id_apt}`)
                .then(() => {
                    alert("Apartamento eliminado exitosamente");
                    setApartmentList(prevList => prevList.filter(apartment => apartment.id_apt !== id_apt));
                })
                .catch((error) => {
                    console.error('Error eliminando apartamento:', error);
                    alert('Hubo un problema al eliminar el apartamento');
                });
        }
    };

    const handleUpdate = (id_apt) => {
        let missingFields = [];
        if (!editFormData.direccion_apt) missingFields.push('Dirección');
        if (!editFormData.barrio) missingFields.push('Barrio');
        if (!editFormData.latitud_apt) missingFields.push('Latitud');
        if (!editFormData.longitud_apt) missingFields.push('Longitud');
        if (!editFormData.info_add_apt) missingFields.push('Información adicional');

        if (missingFields.length > 0) {
            alert(`Por favor rellena los siguientes campos: ${missingFields.join(', ')}`);
        return;
    }
        Axios.put(`http://localhost:3001/apartments/update/${id_apt}`, editFormData)
            .then(() => {
                alert("Apartamento actualizado exitosamente");
                setApartmentList(prevList => prevList.map(apartment =>
                    apartment.id_apt === id_apt ? {...apartment, editFormData } : apartment
                ));
                setEditApartmentId(null);
                })
                .catch((error) => {
                    console.error('Error actualizando apartamento:', error);
                    alert('Hubo un problema al actualizar el apartamento');
                });
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

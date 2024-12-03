import Axios from "axios";
export const loginUser = async ({ email, password, setUser }) => {
    if (!email || !password) {
        return { success: false, message: 'Por favor rellene todos los campos' };
    }
    try {
        const response = await Axios.post('http://localhost:3001/lessors/login', {
            email,
            password
        });
        const { user_id, user_name, user_lastname, user_email, user_phonenumber, user_rol } = response.data;
        setUser({
            id: user_id,
            nombre: user_name,
            apellido: user_lastname,
            email: user_email,
            telefono: user_phonenumber,
            rolId: user_rol
        });
        return { success: true };
    } catch (error) {
        console.error('Error en el login:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Correo o contraseña incorrectos' };
    }
};

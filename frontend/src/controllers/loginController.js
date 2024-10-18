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

        const { Lessor_name, Lessor_lastname, Lessor_email, Lessor_phonenumber } = response.data;

        setUser({
            nombre: Lessor_name,
            apellido: Lessor_lastname,
            email: Lessor_email,
            telefono: Lessor_phonenumber
        });
        return { success: true };
    } catch (error) {
        console.error('Error en el login:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Correo o contraseña incorrectos' };
    }
};

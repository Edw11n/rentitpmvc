import Axios from "axios";

export const signupUser = async (userData) => {
    try {
        await Axios.post("http://localhost:3001/lessors/signup", userData);
        return { success: true };
    } catch (error) {
        console.error("Hubo un error registrando los datos", error);
        return { success: false, message: "Hubo un error registrando los datos" };
    }
};

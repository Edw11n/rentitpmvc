const Lessor = require('../models/LessorModel');

// Controlador para registrar un nuevo usuario
exports.signup = (req, res) => {
    // Desestructuración de los datos del cuerpo de la solicitud
    const { nombre, apellido, email, telefono, password, rolId } = req.body;
    
    // Verificar que todos los campos necesarios estén presentes
    if (!nombre || !apellido || !email || !telefono || !password || !rolId) {
        return res.status(400).send('Por favor ingrese todos los campos');
    }

    // Llamar al método signup del modelo, pasando el rolId
    Lessor.signup({ nombre, apellido, email, telefono, password, rolId }, (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err); // Registro de error
            return res.status(500).send('Error al crear usuario'); // Respuesta de error al cliente
        }
        res.status(201).send('Usuario registrado exitosamente'); // Respuesta de exito al cliente
    });
};

// Controlador para iniciar sesión
exports.login = (req, res) => {
    // Desestructuración de los datos del cuerpo de la solicitud
    const { email, password } = req.body;

    //  Buscar el usuario por su correo electrónico.
    Lessor.findByEmail(email, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err); // Registro de error en la consola
            return res.status(500).send('Error en la consulta'); // Respuesta de error en el cliente
        }

        // Verifica si se encontró un usuario
        if (results.length > 0) {
            const user = results[0]; // Selecciona el primer resultado (usuario encontrado)

            // Comparar la contraseña proporcianada con la almacenada en la base de datos
            Lessor.comparePassword(password, user.user_password, (err, isMatch) => {
                if (err) {
                    console.error('Error al comparar contraseñas:', err); // Registro de error en la consola
                    return res.status(500).send('Error al comparar contraseñas'); // Registro de error en el cliente
                }

                // Verificar si las contraseñas coinciden
                if (isMatch) {
                    // Enviar la respuesta al cliente
                    res.json({
                        user_id: user.user_id, // ID del usuario
                        user_name: user.user_name, // Nombre
                        user_lastname: user.user_lastname, // Apellido
                        user_email: user.user_email, // Email
                        user_phonenumber: user.user_phonenumber, // Número de teléfono
                        user_rol: user.rol_id // Rol de usuario
                    });
                } else {
                    res.status(401).json({ message: 'Correo o contraseña incorrectos.' }); // Respuesta de error si los datos no coinciden
                }
            });
        } else {
            res.status(400).json({ message: 'No existe el usuario, Registrate primero.' }); // Respuesta de error si no se encontró el usuario
        }
    });
};


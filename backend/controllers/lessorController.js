const Lessor = require('../models/LessorModel');

exports.signup = (req, res) => {
    const { nombre, apellido, email, telefono, password } = req.body;
    
    if (!nombre || !apellido || !email || !telefono || !password) {
        return res.status(400).send('Por favor ingrese todos los campos');
    }

    Lessor.signup({ nombre, apellido, email, telefono, password }, (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            return res.status(500).send('Error al crear usuario');
        }
        res.status(201).send('Usuario registrado exitosamente');
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    Lessor.findByEmail(email, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en la consulta');
        }

        if (results.length > 0) {
            const user = results[0];

            Lessor.comparePassword(password, user.Lessor_password, (err, isMatch) => {
                if (err) {
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).send('Error al comparar contraseñas');
                }

                if (isMatch) {
                    res.json({
                        Lessor_name: user.Lessor_name,
                        Lessor_lastname: user.Lessor_lastname,
                        Lessor_email: user.Lessor_email,
                        Lessor_phonenumber: user.Lessor_phonenumber
                    });
                } else {
                    res.status(401).json({ message: 'Correo o contraseña incorrectos' });
                }
            });
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    });
};

const Lessor = require('../models/lessors');
const bcrypt = require('bcrypt');

const LessorController = {
    // Registro de arrendadores
    signup: (req, res) => {
        const { nombre, apellido, email, telefono, password } = req.body;
        if (!nombre || !apellido || !email || !telefono || !password) {
            res.status(400).send('Por favor ingrese todos los campos');
            return;
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al encriptar la contraseña', err);
                res.status(500).send('Error al crear usuario');
                return;
            }

            Lessor.create(nombre, apellido, email, telefono, hashedPassword, (err, result) => {
                if (err) {
                    console.error('Error al crear usuario', err);
                    res.status(500).send('Error al crear usuario');
                } else {
                    res.status(201).send('Usuario registrado exitosamente');
                }
            });
        });
    },

    // Login de arrendadores
    login: (req, res) => {
        const { email, password } = req.body;

        Lessor.findByEmail(email, (err, results) => {
            if (err) {
                console.error('Error en la consulta', err);
                res.status(500).send('Error en la consulta');
                return;
            }

            if (results.length > 0) {
                const user = results[0];

                bcrypt.compare(password, user.Lessor_password, (err, isMatch) => {
                    if (err) {
                        console.error('Error al comparar contraseñas', err);
                        res.status(500).send('Error al comparar contraseñas');
                        return;
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
    }
};

module.exports = LessorController;

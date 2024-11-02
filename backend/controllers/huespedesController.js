// controllers/huespedesController.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Importación añadida
import { body, validationResult } from 'express-validator';
import Huespedes from '../models/huespedesModel.js';
import dotenv from 'dotenv';

dotenv.config();

const huespedesController = express.Router();

// Función para generar el token JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Crear un nuevo huésped
huespedesController.post('/registroHuesped', [
    body('nombres').isString().notEmpty(),
    body('apellidos').isString().notEmpty(),
    body('correo').isEmail().notEmpty(),
    body('contrasena').isString().notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nombres, apellidos, correo, contrasena } = req.body;
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const huesped = await Huespedes.create({
            nombres,
            apellidos,
            correo,
            contrasena: hashedPassword
        });
        res.status(201).json(huesped);
    } catch (error) {
        console.error('Error al crear el huésped:', error);
        res.status(500).json({ error: 'Error al crear el huésped.' });
    }
});

// Iniciar sesión y generar token JWT
huespedesController.post('/login', [
    body('correo').isEmail().notEmpty(),
    body('contrasena').isString().notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { correo, contrasena } = req.body;
        const huesped = await Huespedes.findOne({ where: { correo } });
        if (!huesped) {
            return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
        }
        const validPassword = await bcrypt.compare(contrasena, huesped.contrasena);
        if (!validPassword) {
            return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
        }

        // Generar token JWT
        const token = generarToken(huesped.id_huesped);

        // Enviar token y datos del huésped
        res.status(200).json({
            token,
            id_huesped: huesped.id_huesped,
            nombres: huesped.nombres
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
});

export default huespedesController;
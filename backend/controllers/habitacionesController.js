import express from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import Habitaciones from '../models/habitacionesModel.js';

const habitacionesController = express.Router();

// Configuración de multer para la subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Crear una nueva habitación
habitacionesController.post('/crearHabitacion', upload.single('imagen'), [
    body('nombre').isString().notEmpty(),
    body('descripcion').isString().optional(),
    body('capacidad').isInt({ min: 1 }).optional(),
    body('tipo_cama').isString().optional(),
    body('tamano_m2').isInt({ min: 1 }).optional(),
    body('desayuno_incluido').isBoolean().optional(),
    body('precio').isFloat({ min: 0 }).optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nombre, descripcion, capacidad, tipo_cama, tamano_m2, desayuno_incluido, precio } = req.body;
        const imagen_url = req.file ? req.file.path : null;
        const habitacion = await Habitaciones.create({
            nombre,
            descripcion,
            capacidad,
            tipo_cama,
            tamano_m2,
            desayuno_incluido,
            precio,
            imagen_url
        });
        res.status(201).json(habitacion);
    } catch (error) {
        console.error('Error al crear la habitación:', error);
        res.status(500).json({ error: 'Error al crear la habitación.' });
    }
});

// Obtener todas las habitaciones
habitacionesController.get('/habitaciones', async (req, res) => {
    try {
        const habitaciones = await Habitaciones.findAll();
        res.status(200).json(habitaciones);
    } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
        res.status(500).json({ error: 'Error al obtener las habitaciones.' });
    }
});

// Obtener una habitación por su ID
habitacionesController.get('/habitaciones/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitaciones.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ error: 'Habitación no encontrada.' });
        }
        res.status(200).json(habitacion);
    } catch (error) {
        console.error('Error al obtener la habitación:', error);
        res.status(500).json({ error: 'Error al obtener la habitación.' });
    }
});

// Actualizar una habitación por su ID
habitacionesController.put('/habitaciones/:id', upload.single('imagen'), [
    body('nombre').isString().optional(),
    body('descripcion').isString().optional(),
    body('capacidad').isInt({ min: 1 }).optional(),
    body('tipo_cama').isString().optional(),
    body('tamano_m2').isInt({ min: 1 }).optional(),
    body('desayuno_incluido').isBoolean().optional(),
    body('precio').isFloat({ min: 0 }).optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const habitacion = await Habitaciones.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ error: 'Habitación no encontrada.' });
        }

        const { nombre, descripcion, capacidad, tipo_cama, tamano_m2, desayuno_incluido, precio } = req.body;
        const imagen_url = req.file ? req.file.path : habitacion.imagen_url;
        await habitacion.update({
            nombre: nombre || habitacion.nombre,
            descripcion: descripcion || habitacion.descripcion,
            capacidad: capacidad || habitacion.capacidad,
            tipo_cama: tipo_cama || habitacion.tipo_cama,
            tamano_m2: tamano_m2 || habitacion.tamano_m2,
            desayuno_incluido: desayuno_incluido || habitacion.desayuno_incluido,
            precio: precio || habitacion.precio,
            imagen_url
        });
        res.status(200).json(habitacion);
    } catch (error) {
        console.error('Error al actualizar la habitación:', error);
        res.status(500).json({ error: 'Error al actualizar la habitación.' });
    }
});

// Eliminar una habitación por su ID
habitacionesController.delete('/habitaciones/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitaciones.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ error: 'Habitación no encontrada.' });
        }
        await habitacion.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar la habitación:', error);
        res.status(500).json({ error: 'Error al eliminar la habitación.' });
    }
});

export default habitacionesController;
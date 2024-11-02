import express from 'express';
import { body, validationResult } from 'express-validator';
import Reservas from '../models/reservasModel.js';
import DetallesReservas from '../models/detallesReservasModel.js';
import Habitaciones from '../models/habitacionesModel.js';
import Huespedes from '../models/huespedesModel.js';
import { v4 as uuidv4 } from 'uuid';

const reservasController = express.Router();

// Crear una nueva reserva
reservasController.post('/crearReserva', [
    body('fecha_entrada').isDate().notEmpty(),
    body('fecha_salida').isDate().notEmpty(),
    body('id_habitacion').isInt({ min: 1 }).notEmpty(),
    body('id_huesped').isInt({ min: 1 }).notEmpty(),
    body('numero_huespedes').isInt({ min: 1 }).notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fecha_entrada, fecha_salida, id_habitacion, id_huesped, numero_huespedes } = req.body;

        // Validar que la habitación y el huésped existan
        const habitacion = await Habitaciones.findByPk(id_habitacion);
        if (!habitacion) {
            return res.status(404).json({ error: 'Habitación no encontrada.' });
        }
        const huesped = await Huespedes.findByPk(id_huesped);
        if (!huesped) {
            return res.status(404).json({ error: 'Huésped no encontrado.' });
        }

        // Calcular el costo total según la duración de la estancia
        const diasEstadia = (new Date(fecha_salida) - new Date(fecha_entrada)) / (1000 * 60 * 60 * 24);
        const costo_total = habitacion.precio * diasEstadia;

        // Generar un código de reserva único
        const codigo_reserva = uuidv4();

        // Crear la reserva
        const reserva = await Reservas.create({
            fecha_entrada,
            fecha_salida,
            id_habitacion,
            id_huesped,
            numero_huespedes,
            estado: 'pendiente',
            codigo_reserva,
            precio_total: costo_total
        });

        // Crear detalles de la reserva
        await DetallesReservas.create({
            id_reserva: reserva.id_reserva, // Asegúrate de usar el campo correcto para el ID de la reserva
            fecha_entrada,
            fecha_salida,
            numero_camas: habitacion.capacidad,  // Asignar camas según capacidad de la habitación
            numero_personas: numero_huespedes,
            resumen_costo: `Estadía de ${diasEstadia} días en habitación ${habitacion.nombre}`,
            costo_total
        });

        res.status(201).json(reserva);
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ error: 'Error al crear la reserva.' });
    }
});

//obtener historial de reservas de un huesped
reservasController.get('/historialReservas/:id_huesped', async (req, res) => {
    try {
        const { id_huesped } = req.params;
        const historialReservas = await Reservas.findAll({
            where: { id_huesped },
            include: {
                model: DetallesReservas,
                as: 'detalles'
            }
        });
        res.status(200).json(historialReservas);
    } catch (error) {
        console.error('Error al obtener el historial de reservas:', error);
        res.status(500).json({ error: 'Error al obtener el historial de reservas.' });
    }
});

//Accede a través de GET /api/reservas/historial, permitiendo ver todas las reservas del huésped, incluyendo el estado y detalles

reservasController.get('/historial', async (req, res) => {
    try {
        const historialReservas = await Reservas.findAll({
            include: {
                model: DetallesReservas,
                as: 'detalles'
            }
        });
        res.status(200).json(historialReservas);
    } catch (error) {
        console.error('Error al obtener el historial de reservas:', error);
        res.status(500).json({ error: 'Error al obtener el historial de reservas.' });
    }
});


export default reservasController;
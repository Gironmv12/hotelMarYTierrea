import express from 'express';
import habitacionesController from '../controllers/habitacionesController.js';

const habitacionesRoutes = express.Router();

habitacionesRoutes.use('/habitacion', habitacionesController);

export default habitacionesRoutes;
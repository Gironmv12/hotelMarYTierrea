import express from 'express';
import reservasController from '../controllers/reservasController.js';

const reservasRoutes = express.Router();

reservasRoutes.use('/reserva', reservasController);

export default reservasRoutes; 

import express from 'express';
import huespedesController from '../controllers/huespedesController.js';

const huespedesRoutes = express.Router();

huespedesRoutes.use('/huesped',huespedesController);

export default huespedesRoutes;

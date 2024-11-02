// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { conectDB } from './config/db.js';
import { syncDB } from './models/indexModel.js';

import huespedesRoutes from './routes/huespedesRoutes.js';
import habitacionesRoutes from './routes/habitacionesRoutes.js';
import reservasRoutes from './routes/reservasRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;

// Rutas
app.use('/api', huespedesRoutes);
app.use('/api', habitacionesRoutes);
app.use('/api', reservasRoutes);

// Conectar a la base de datos y sincronizar modelos
conectDB().then(() => {
    syncDB().then(() => {
        app.listen(PORT, () => {
            console.log('Base de datos conectada y sincronizada.');
            console.log(`Server is running on port ${PORT}`);
        });
    });
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
});
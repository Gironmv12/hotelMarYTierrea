// indexModel.js
import { sequelize } from "../config/db.js";
import Huespedes from "./huespedesModel.js";
import Reservas from "./reservasModel.js";
import DetallesReservas from "./detallesReservasModel.js";
import Habitaciones from "./habitacionesModel.js";

// Inicializar modelos
const models = {
    Huespedes,
    Reservas,
    DetallesReservas,
    Habitaciones
};

// Definir relaciones
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sincronizar la base de datos
const syncDB = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing the models:", error);
        throw error;
    }
};

export { sequelize, syncDB, models };
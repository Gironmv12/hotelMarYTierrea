import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class DetallesReservas extends Model {}

DetallesReservas.init({
    id_detalle: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_reserva: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'reservas',
            key: 'id_reserva'
        }
    },
    fecha_entrada: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: true
    },
    numero_camas: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    numero_personas: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    resumen_costo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    costo_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'DetallesReservas',
    tableName: 'detallesreserva',
    timestamps: false
});

// Definir relaciones
DetallesReservas.associate = (models) => {
    DetallesReservas.belongsTo(models.Reservas, {
        foreignKey: 'id_reserva',
        as: 'reserva'
    });
};

export default DetallesReservas;
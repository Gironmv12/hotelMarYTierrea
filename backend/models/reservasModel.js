import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class Reservas extends Model {}

Reservas.init({
    id_reserva: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_habitacion: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'habitaciones',
            key: 'id_habitacion'
        }
    },
    id_huesped: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'huespedes',
            key: 'id_huesped'
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
    numero_huespedes: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    codigo_reserva: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Reservas',
    tableName: 'reservas',
    timestamps: false
});

// Definir relaciones
Reservas.associate = (models) => {
    Reservas.belongsTo(models.Habitaciones, {
        foreignKey: 'id_habitacion',
        as: 'habitacion'
    });
    Reservas.belongsTo(models.Huespedes, {
        foreignKey: 'id_huesped',
        as: 'huesped'
    });
    Reservas.hasMany(models.DetallesReservas, {
        foreignKey: 'id_reserva',
        as: 'detalles'
    });
};

export default Reservas;
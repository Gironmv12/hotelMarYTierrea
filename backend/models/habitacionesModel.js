import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Habitaciones extends Model {}

Habitaciones.init({
    id_habitacion: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    capacidad: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    tipo_cama: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    tamano_m2: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    desayuno_incluido: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    imagen_url: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Habitaciones',
    tableName: 'habitaciones',
    timestamps: false
});

// Definir relaciones
Habitaciones.associate = (models) => {
    Habitaciones.hasMany(models.Reservas, {
        foreignKey: 'id_habitacion',
        as: 'reservas'
    });
};

export default Habitaciones;
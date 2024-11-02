// huespedesModel.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class Huespedes extends Model {}

Huespedes.init({
    id_huesped: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Huespedes',
    tableName: 'huespedes',
    timestamps: false
});

// Definir relaciones
Huespedes.associate = (models) => {
    Huespedes.hasMany(models.Reservas, {
        foreignKey: 'id_huesped',
        as: 'reservas'
    });
};

export default Huespedes;
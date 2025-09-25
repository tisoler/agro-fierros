import DataBaseConnection from '@/app/_lib/sequelize';
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from 'sequelize';

export class PrecioMercado extends Model<
  InferAttributes<PrecioMercado>,
  InferCreationAttributes<PrecioMercado>
> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare precio: number;
  declare activo: boolean;
  declare icono: string;
}

export const initPrecioMercado = async (db?: Sequelize) => {
  const sequelize = db ?? await DataBaseConnection.getSequelizeInstance();

  PrecioMercado.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      icono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'preciosMercado',
      timestamps: false,
    }
  );
};

import DataBaseConnection from '@/app/_lib/sequelize';
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from 'sequelize';
import { initMarca, Marca } from './marca';
import { Categoria, initCategoria } from './categoria';
import { initUnidadImagen, UnidadImagen } from './unidadImagen';
import { initUnidadDetalle, UnidadDetalle } from './unidadDetalle';

export class Unidad extends Model<
  InferAttributes<Unidad>,
  InferCreationAttributes<Unidad>
> {
  declare id: CreationOptional<number>;
  declare titulo: string;
  declare descripcion: string;
  declare imagenDestacadaUrl: string;
  declare imagenDestacadaTextoAlt: string;
  declare idCategoria: number;
  declare esOportunidad: boolean;
  declare esNovedad: boolean;
  declare nuevo: boolean;
  declare modelo: string;
  declare idMarca: number;
  declare slug: string;
}

export const initUnidad = async (db?: Sequelize) => {
  const sequelize = db ?? await DataBaseConnection.getSequelizeInstance();

  Unidad.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagenDestacadaUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagenDestacadaTextoAlt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },
      esOportunidad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      esNovedad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      nuevo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idMarca: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'unidades',
      timestamps: false,
    }
  );

  // Asociar Marca a Unidad
  await initMarca(sequelize);
  if (!Unidad.associations.marca) {
    Unidad.belongsTo(Marca, { foreignKey: 'idMarca', as: 'marca' });
  }

  // Asociar Categoria a Unidad
  await initCategoria(sequelize);
  if (!Unidad.associations.categoria) {
    Unidad.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });
  }

  // Asociar Ímagenes a Unidad
  await initUnidadImagen(sequelize);
  if (!Unidad.associations.imagenes) {
    Unidad.hasMany(UnidadImagen, { foreignKey: 'idUnidad', as: 'imagenes' });
  }

  // Asociar Detalles Técnicos a Unidad
  await initUnidadDetalle(sequelize);
  if (!Unidad.associations.detalles) {
    Unidad.hasMany(UnidadDetalle, { foreignKey: 'idUnidad', as: 'detalles' });
  }
};

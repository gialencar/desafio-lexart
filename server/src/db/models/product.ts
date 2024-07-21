import { DataTypes, Model } from 'sequelize';
import db from '.';

class Product extends Model {
  declare id: number;
  declare name: string;
  declare brand: string;
  declare model: string;
  declare price: number;
  declare color: string;
}

Product.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'products',
    timestamps: false,
  }
);

export default Product;

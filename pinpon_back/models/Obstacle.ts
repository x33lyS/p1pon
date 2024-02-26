import { Model, DataTypes, Sequelize } from 'sequelize';
import { Robot } from './Robot';

export class Obstacle extends Model {
  public id!: number;
  public type!: string;
  public robots!: Robot[];

  static initModel(sequelize: Sequelize) {
    Obstacle.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: new DataTypes.ENUM('Mer', 'Terre', 'Montagne'),
        allowNull: false,
      },
    }, {
      tableName: 'obstacles',
      sequelize: sequelize,
    });
  }
}

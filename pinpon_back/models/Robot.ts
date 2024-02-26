import { Model, DataTypes, Sequelize } from 'sequelize';

export class Robot extends Model {
  public id!: number;
  public name!: string;
  public isHome!: boolean;
  public speed!: number;
  public firespread!: number;

  static initModel(sequelize: Sequelize) {
    Robot.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      isHome: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      firespread: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ...Object.keys(Robot.prototype).reduce((acc, key) => {
        acc[key] = Robot.prototype[key];
        return acc;
      }, {}),
    }, {
      tableName: 'robots',
      sequelize: sequelize,
    });
  }
}

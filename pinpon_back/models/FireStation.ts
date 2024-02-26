import { Model, DataTypes, Sequelize } from 'sequelize';
import { Robot } from './Robot';

export class FireStation extends Model {
  public id!: number;
  public name!: string;
  public robots!: Robot[];
  public capacity!: number;
  public locationGps!: string;


  static initModel(sequelize: Sequelize) {
    FireStation.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      capacity : {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      locationGps : {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: true,
      },
      
    }, {
      tableName: 'firestations',
      sequelize: sequelize,
    });
  }
}

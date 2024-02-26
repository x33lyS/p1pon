import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { Robot } from '../models/Robot';
import { FireStation } from '../models/FireStation';
import { Obstacle } from '../models/Obstacle';

dotenv.config();

const sequelize: Sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

Robot.initModel(sequelize);
FireStation.initModel(sequelize);
Obstacle.initModel(sequelize);

FireStation.belongsToMany(Robot, {
  through: 'FireStationRobots', // Nom de la table de jonction
  as: 'robots', // Alias pour accéder aux robots depuis une FireStation
  foreignKey: 'fireStationId', // Clé étrangère dans la table de jonction pour FireStation
  otherKey: 'robotId' // Clé étrangère pour Robot
});
Robot.belongsToMany(FireStation, {
  through: 'FireStationRobots', // Nom de la table de jonction
  as: 'fireStations', // Alias pour accéder aux FireStations depuis un Robot
  foreignKey: 'robotId', // Clé étrangère dans la table de jonction pour Robot
  otherKey: 'fireStationId' // Clé étrangère pour FireStation
});
Robot.belongsToMany(Obstacle, {
  through: 'RobotObstacles', // Nom de la table de jonction
  as: 'obstacles', // Alias pour accéder aux obstacles depuis un Robot
  foreignKey: 'robotId', // Clé étrangère dans la table de jonction pour Robot
  otherKey: 'obstacleId' // Clé étrangère pour Obstacle
});
Obstacle.belongsToMany(Robot, {
  through: 'RobotObstacles', // Nom de la table de jonction
  as: 'robots', // Alias pour accéder aux robots depuis un Obstacle
  foreignKey: 'obstacleId', // Clé étrangère dans la table de jonction pour Obstacle
  otherKey: 'robotId' // Clé étrangère pour Robot
});

export {
  sequelize,
};
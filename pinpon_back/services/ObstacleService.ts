import { Obstacle } from '../models/Obstacle';

export default class ObstacleService {
  constructor() {
  }

  getAll() {
    return Obstacle.findAll();
  }

  getById(id: number) {
    return Obstacle.findByPk(id);
  }

  create(obstacleData: Partial<Obstacle>) {
    return Obstacle.create(obstacleData);
  }

  async update(id: number, obstacleData: Partial<Obstacle>) {
    const obstacle = await Obstacle.findByPk(id);
    if (obstacle) {
      return obstacle.update(obstacleData);
    } else {
      throw new Error('Obstacle not found');
    }
  }

  delete(id: number) {
    return Obstacle.destroy({
      where: { id }
    });
  }
}

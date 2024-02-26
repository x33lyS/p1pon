import express from 'express';
import ObstacleController from '../controllers/ObstacleController';

export default class RobotRouter {
  router: express.Router;
  obstacleController: ObstacleController;
  constructor() {
    this.router = express.Router();
    this.obstacleController = new ObstacleController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.obstacleController.getAllObstacles.bind(this.obstacleController));
    this.router.get('/:id', this.obstacleController.getObstacleById.bind(this.obstacleController));
    this.router.post('/', this.obstacleController.createObstacle.bind(this.obstacleController));
    this.router.put('/:id', this.obstacleController.updateObstacle.bind(this.obstacleController));
    this.router.delete('/:id', this.obstacleController.deleteObstacle.bind(this.obstacleController));
  }

  getRouter() {
    return this.router;
  }
}

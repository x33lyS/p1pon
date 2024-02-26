import express from 'express';
import RobotController from '../controllers/RobotController';

export default class RobotRouter {
  router: express.Router;
  robotController: RobotController;
  constructor() {
    this.router = express.Router();
    this.robotController = new RobotController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.robotController.getAllRobots.bind(this.robotController));
    this.router.get('/:id', this.robotController.getRobotById.bind(this.robotController));
    this.router.post('/', this.robotController.createRobot.bind(this.robotController));
    this.router.put('/:id', this.robotController.updateRobot.bind(this.robotController));
    this.router.delete('/:id', this.robotController.deleteRobot.bind(this.robotController));
  }

  getRouter() {
    return this.router;
  }
}

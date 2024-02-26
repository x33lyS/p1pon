import express from 'express';
import FireStationController from '../controllers/FireStationController';

export default class FireStationRouter {
  router: express.Router;
  fireStationController: FireStationController;
  constructor() {
    this.router = express.Router();
    this.fireStationController = new FireStationController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.fireStationController.getAllFireStations.bind(this.fireStationController));
    this.router.get('/:id', this.fireStationController.getFireStationById.bind(this.fireStationController));
    this.router.post('/', this.fireStationController.createFireStation.bind(this.fireStationController));
    this.router.put('/:id', this.fireStationController.updateFireStation.bind(this.fireStationController));
    this.router.delete('/:id', this.fireStationController.deleteFireStation.bind(this.fireStationController));
  }

  getRouter() {
    return this.router;
  }
}

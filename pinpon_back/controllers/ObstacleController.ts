import ObstacleService from "../services/ObstacleService";

export default class ObstacleController {
  obstacleService : ObstacleService;
  constructor() {
    this.obstacleService = new ObstacleService();
  }

  async getAllObstacles(req, res) {
    try {
      const obstacles = await this.obstacleService.getAll();
      res.status(200).json({ success: true, data: obstacles });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getObstacleById(req, res) {
    try {
      const obstacle = await this.obstacleService.getById(req.params.id);
      if (obstacle) {
        res.status(200).json({ success: true, data: obstacle });
      } else {
        res.status(404).json({ success: false, message: 'Obstacle not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async createObstacle(req, res) {
    try {
      const newObstacle = await this.obstacleService.create(req.body);
      res.status(201).json({ success: true, data: newObstacle });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateObstacle(req, res) {
    try {
      const updatedObstacle = await this.obstacleService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: updatedObstacle });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteObstacle(req, res) {
    try {
      await this.obstacleService.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Obstacle deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

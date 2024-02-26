import RobotService from "../services/RobotService";

export default class RobotController {
  robotService : RobotService;
  constructor() {
    this.robotService = new RobotService();
  }

  async getAllRobots(req, res) {
    try {
      const robots = await this.robotService.getAll();
      res.status(200).json({ success: true, data: robots });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getRobotById(req, res) {
    try {
      const robot = await this.robotService.getById(req.params.id);
      if (robot) {
        res.status(200).json({ success: true, data: robot });
      } else {
        res.status(404).json({ success: false, message: 'Robot not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async createRobot(req, res) {
    try {
      const newRobot = await this.robotService.create(req.body);
      res.status(201).json({ success: true, data: newRobot });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateRobot(req, res) {
    try {
      const updatedRobot = await this.robotService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: updatedRobot });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteRobot(req, res) {
    try {
      await this.robotService.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Robot deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

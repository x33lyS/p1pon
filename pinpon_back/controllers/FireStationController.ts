import FireStationService from "../services/FireStationService";

export default class FireStationController {
  fireStationService: FireStationService;

  constructor() {
    this.fireStationService = new FireStationService();
  }

  async getAllFireStations(req, res) {
    try {
      const fireStations = await this.fireStationService.getAll();
      res.status(200).json({ success: true, data: fireStations });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getFireStationById(req, res) {
    try {
      const fireStation = await this.fireStationService.getById(req.params.id);
      if (fireStation) {
        res.status(200).json({ success: true, data: fireStation });
      } else {
        res.status(404).json({ success: false, message: 'Fire Station not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async createFireStation(req, res) {
    try {
      const newFireStation = await this.fireStationService.create(req.body);
      res.status(201).json({ success: true, data: newFireStation });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateFireStation(req, res) {
    try {
      const updatedFireStation = await this.fireStationService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: updatedFireStation });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteFireStation(req, res) {
    try {
      await this.fireStationService.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Fire Station deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

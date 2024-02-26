import { FireStation } from '../models/FireStation';

export default class FireStationService {
  constructor() {
  }

  getAll() {
    return FireStation.findAll();
  }

  getById(id: number) {
    return FireStation.findByPk(id);
  }

  create(fireStationData: Partial<FireStation>) {
    return FireStation.create(fireStationData);
  }

  async update(id: number, fireStationData: Partial<FireStation>) {
    const fireStation = await FireStation.findByPk(id);
    if (fireStation) {
      return fireStation.update(fireStationData);
    } else {
      throw new Error('Fire Station not found');
    }
  }

  delete(id: number) {
    return FireStation.destroy({
      where: { id }
    });
  }
}

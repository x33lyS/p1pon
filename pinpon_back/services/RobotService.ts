import { Robot } from '../models/Robot';

export default class RobotService {
  constructor() {
  }

  getAll() {
    return Robot.findAll();
  }

  getById(id: number) {
    return Robot.findByPk(id);
  }

  create(robotData: Partial<Robot>) {
    return Robot.create(robotData);
  }

  async update(id: number, robotData: Partial<Robot>) {
    const robot = await Robot.findByPk(id);
    if (robot) {
      return robot.update(robotData);
    } else {
      throw new Error('Robot not found');
    }
  }

  delete(id: number) {
    return Robot.destroy({
      where: { id }
    });
  }
}

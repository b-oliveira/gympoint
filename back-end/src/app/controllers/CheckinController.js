import { startOfDay, endOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student)
      return res.status(404).json({ error: 'Student does not exist!' });

    const checkins = await Checkin.findAll({
      attributes: ['created_at'],
      where: {
        student_id: id,
      },
      order: [['created_at', 'desc']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student)
      return res.status(404).json({ error: 'Student does not exist!' });

    const currentDate = new Date();

    const checkinsCount = await Checkin.count({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [
            startOfDay(subDays(currentDate, 7)),
            endOfDay(currentDate),
          ],
        },
      },
    });

    if (checkinsCount > 5)
      return res.status(400).json({ error: 'Checkins limit exceeded!' });

    const { created_at } = await Checkin.create({
      student_id: id,
    });

    return res.json({
      student_id: id,
      created_at,
    });
  }
}

export default new CheckinController();

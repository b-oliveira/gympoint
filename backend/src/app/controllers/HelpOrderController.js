import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student)
      return res.status(404).json({ error: 'Student does not exist!' });

    const helpOrders = await HelpOrder.findAll({
      attributes: ['id', 'question', 'answer', 'created_at'],
      where: {
        student_id: id,
      },
      order: [['created_at', 'desc']],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student)
      return res.status(404).json({ error: 'Student does not exist!' });

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const { question } = req.body;

    const { id } = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json({
      id,
      student_id,
      question,
    });
  }
}

export default new HelpOrderController();

import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
      where: {
        answer: null,
      },
      order: ['created_at'],
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder)
      return res.status(404).json({ error: 'Help Order does not exist!' });

    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const { answer } = req.body;

    const { student_id, question, created_at } = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    const { name, email } = helpOrder.student;

    await Queue.add(AnswerMail.key, {
      student: {
        name,
        email,
      },
      question,
      answer,
    });

    return res.json({
      id,
      student_id,
      question,
      answer,
      created_at,
    });
  }
}

export default new AnswerController();

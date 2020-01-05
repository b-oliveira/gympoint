import { Op } from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { name } = req.query;

    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'birth_date', 'age'],
      where: name ? { name: { [Op.iLike]: `%${name}%` } } : {},
      order: ['name'],
    });

    return res.json(students);
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'email',
        'birth_date',
        'age',
        'weight',
        'height',
      ],
    });

    if (!student)
      return res.status(404).json({ error: 'Student does not exist!' });

    return res.send(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birth_date: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const student = await Student.findOne({
      where: { email: req.body.email },
    });

    if (student)
      return res.status(400).json({ error: 'Student already exists!' });

    const { id, name, email, weight, height, age } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      weight,
      height,
      age,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birth_date: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const student = await Student.findByPk(req.params.id);

    if (!student)
      return res.status(400).json({ error: 'Student does not exist!' });

    const { email } = req.body;

    if (email !== student.email) {
      const studentExist = await Student.findOne({
        attributes: ['id'],
        where: { email },
      });

      if (studentExist)
        return res.status(400).json({ error: 'Student already exists!' });
    }

    const { id, name, weight, height, age } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      weight,
      height,
      age,
    });
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student)
      return res.status(404).json({ error: 'Student does not exist!' });

    await student.destroy();

    return res.send();
  }
}

export default new StudentController();

import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
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
}

export default new StudentController();

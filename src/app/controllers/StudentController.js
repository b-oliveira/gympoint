import Student from '../models/Student';

class StudentController {
  async store(req, res) {
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

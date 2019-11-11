import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Subscription from '../models/Subscription';
import Student from '../models/Student';
import Plan from '../models/Plan';

class SubscriptionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id, { attributes: ['id'] });

    if (!student) return res.status(404).json({ error: 'Student not found!' });

    const plan = await Plan.findByPk(plan_id, {
      attributes: ['duration', 'price'],
    });

    if (!plan) return res.status(404).json({ error: 'Plan not found!' });

    const { duration, price } = plan;

    const subscription = {
      student_id,
      plan_id,
      start_date,
      end_date: addMonths(parseISO(start_date), duration),
      price: duration * price,
    };

    await Subscription.create(subscription);

    return res.json();
  }
}

export default new SubscriptionController();

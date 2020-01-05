import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

import Subscription from '../models/Subscription';
import Student from '../models/Student';
import Plan from '../models/Plan';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    const data = subscriptions.map(subscription => {
      const {
        id,
        start_date,
        end_date,
        price,
        active,
        student,
        plan,
      } = subscription;

      const start_date_formatted = format(
        parseISO(subscription.start_date),
        "d 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      );

      const end_date_formatted = format(
        parseISO(subscription.end_date),
        "d 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      );

      return {
        id,
        start_date,
        start_date_formatted,
        end_date,
        end_date_formatted,
        price,
        active,
        student,
        plan,
      };
    });

    return res.json(data);
  }

  async show(req, res) {
    const subscription = await Subscription.findByPk(req.params.id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    if (!subscription)
      return res.status(404).json({ error: 'Subscription does not exist!' });

    return res.send(subscription);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id, {
      attributes: ['id', 'name', 'email'],
    });

    if (!student) return res.status(404).json({ error: 'Student not found!' });

    const plan = await Plan.findByPk(plan_id, {
      attributes: ['title', 'duration', 'price'],
    });

    if (!plan) return res.status(404).json({ error: 'Plan not found!' });

    const { title, duration, price } = plan;

    const subscription = {
      student_id,
      plan_id,
      start_date: format(parseISO(start_date), 'yyyy-MM-dd'),
      end_date: format(addMonths(parseISO(start_date), duration), 'yyyy-MM-dd'),
      price: duration * price,
    };

    const { id, active } = await Subscription.create(subscription);

    const { name, email } = student;

    await Queue.add(SubscriptionMail.key, {
      subscription: {
        ...subscription,
        student: {
          name,
          email,
        },
        plan: {
          title,
        },
      },
    });

    return res.json({
      ...subscription,
      id,
      active,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription)
      return res.status(400).json({ error: 'Subscription does not exist!' });

    const { plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id, {
      attributes: ['duration', 'price'],
    });

    if (!plan) return res.status(404).json({ error: 'Plan not found!' });

    const { duration, price } = plan;

    const { id, student_id, end_date, active } = await subscription.update({
      plan_id,
      start_date,
      end_date: addMonths(parseISO(start_date), duration),
      price: duration * price,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date: format(parseISO(start_date), 'dd/MM/yyyy'),
      end_date: format(parseISO(end_date), 'dd/MM/yyyy'),
      price: duration * price,
      active,
    });
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription)
      return res.status(400).json({ error: 'Subscription does not exist!' });

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();

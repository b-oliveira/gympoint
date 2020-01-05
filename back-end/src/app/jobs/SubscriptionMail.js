import { parseISO, format } from 'date-fns';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { student, plan, start_date, end_date, price } = data.subscription;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Inscrição realizada',
      template: 'subscription',
      context: {
        student: student.name,
        plan: plan.title,
        start_date: format(parseISO(start_date), 'dd/MM/yyyy'),
        end_date: format(parseISO(end_date), 'dd/MM/yyyy'),
        price,
      },
    });
  }
}

export default new SubscriptionMail();

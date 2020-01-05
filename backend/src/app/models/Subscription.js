import Sequelize, { Model } from 'sequelize';
import { parseISO, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATEONLY,
        end_date: Sequelize.DATEONLY,
        price: Sequelize.DOUBLE,
        active: {
          type: Sequelize.VIRTUAL,
          get() {
            return (
              isBefore(startOfDay(parseISO(this.start_date)), new Date()) &&
              isAfter(endOfDay(parseISO(this.end_date)), new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Subscription;

import Sequelize, { Model } from 'sequelize';
import {
  startOfToday,
  startOfDay,
  parseISO,
  differenceInYears,
} from 'date-fns';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        birth_date: Sequelize.DATEONLY,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return differenceInYears(
              startOfToday(),
              startOfDay(parseISO(this.birth_date))
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
}

export default Student;

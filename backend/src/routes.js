import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import CheckinController from './app/controllers/CheckinController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import SubscriptionController from './app/controllers/SubscriptionController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id', StudentController.show);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.get('/subscriptions/:id', SubscriptionController.show);
routes.post('/subscriptions', SubscriptionController.store);
routes.put('/subscriptions/:id', SubscriptionController.update);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/help-orders', AnswerController.index);
routes.put('/help-orders/:id/answer', AnswerController.update);

export default routes;

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

const loginValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

sessionsRouter.post('/', loginValidation, sessionsController.create);

export default sessionsRouter;

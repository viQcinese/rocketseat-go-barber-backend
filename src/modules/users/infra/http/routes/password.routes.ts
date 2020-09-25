import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const forgotPasswordValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

const resetPasswordValidation = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

passwordRouter.post(
  '/forgot',
  forgotPasswordValidation,
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  resetPasswordValidation,
  resetPasswordController.create,
);

export default passwordRouter;

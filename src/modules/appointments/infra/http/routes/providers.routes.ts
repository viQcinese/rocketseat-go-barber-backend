import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerDayAvailability = new ProviderDayAvailabilityController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();

const availabilityValidation = celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  availabilityValidation,
  providerMonthAvailability.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  availabilityValidation,
  providerDayAvailability.index,
);

export default providersRouter;

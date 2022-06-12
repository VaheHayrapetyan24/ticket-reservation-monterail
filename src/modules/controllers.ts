import { UsersController } from './users/users.controller';
import { EventsController } from './events/events.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { PaymentsController } from '../mocks/payment/payments.controller';

const controllers = [UsersController, EventsController, ReservationsController, PaymentsController];

export default controllers;

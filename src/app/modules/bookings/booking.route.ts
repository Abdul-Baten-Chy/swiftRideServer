import { Router } from 'express';
import auth from '../../../midleware/auth';
import { bookingController } from './booking.controller';

const route = Router();

route.post('/', auth('user'), bookingController.createBooking);
route.get('/', auth('admin'), bookingController.getAllBookings);
route.get('/my-bookings', auth('user'), bookingController.getMybookings);

export const bookingRoute = route;

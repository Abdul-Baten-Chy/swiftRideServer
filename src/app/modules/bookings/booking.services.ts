import { Car } from '../cars/cars.model';
import { User } from '../user/user.model';
import { Tbooking } from './booking.interface';
import { Booking } from './bookings.model';

const createBookingIntoDB = async (payload: Tbooking, userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (user) {
    payload.user = user?._id;
  }

  const newBooking = await Booking.create(payload);

  if (newBooking) {
    await Car.findByIdAndUpdate(payload.car, { status: 'unavailable' });
  }
  await newBooking.populate('user car');
  return newBooking;
};
const getAllBooking = async (carId: string) => {
  return await Booking.find({ car: carId });
};
const getMyBookingFromDb = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  let userId;
  if (user) {
    userId = user?._id;
    console.log({ userId, user });
  }

  return await Booking.find({ user: userId });
};
export const bookingService = {
  createBookingIntoDB,
  getAllBooking,
  getMyBookingFromDb,
};

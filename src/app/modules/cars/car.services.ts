import AppError from '../../error/appError';
import { Booking } from '../bookings/bookings.model';
import { Tcars } from './cars.interface';
import { Car } from './cars.model';

const createCarsIntoDB = async (payload: Tcars) => {
  return await Car.create(payload);
};

const getAllCarsFromDB = async (search: any) => {
  return await Car.find(search);
};

const getSingleCarsfromDB = async (id: string) => {
  const car = await Car.findById(id);
  if (!car) {
    throw new AppError(404, 'No Data Found');
  } else {
    return car;
  }
};

const updateCarIntoDB = async (id: string, payload: Partial<Tcars>) => {
  const { features, ...remaining } = payload;
  let returnObj = null;

  if (features && features.length) {
    returnObj = await Car.findByIdAndUpdate(
      id,
      { $addToSet: { features: features }, $set: remaining },
      { new: true }
    );
  } else {
    returnObj = await Car.findByIdAndUpdate(id, remaining, { new: true });
  }
  if (!returnObj) {
    throw new AppError(404, 'No Data Found');
  } else {
    return returnObj;
  }
};

const deleteAcarFromDB = async (id: string) => {
  return await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
const carReturn = async (payload: { bookingId: string; endTime: string }) => {
  const bookingId = payload.bookingId;
  const endTime = payload.endTime;

  const booking = await Booking.findById(bookingId).populate('car user');
  console.log(booking);

  const startTime = booking?.startTime;
  const startDate = booking?.date;
  const startPart: string[] = startTime?.split(':') as string[];
  const endTimePart: string[] = endTime.split(':');
  const startDateObj: Date = new Date(startDate as Date);
  const startDateTime: Date = new Date(startDateObj);
  startDateTime.setHours(parseInt(startPart[0], 10));
  startDateTime.setMinutes(parseInt(startPart[1], 10));
  startDateTime.setSeconds(0);
  const endDateTime: Date = new Date(startDateObj);
  endDateTime.setHours(parseInt(endTimePart[0], 10));
  endDateTime.setMinutes(parseInt(endTimePart[1], 10));
  endDateTime.setSeconds(0);
  const timeDifferenceMs: number =
    endDateTime.getTime() - startDateTime.getTime();
  const timeDifferenceMinutes: number = timeDifferenceMs / (1000 * 60 * 60);
  const totalCost =
    (booking?.car?.pricePerHour as number) * timeDifferenceMinutes;

  if (booking) {
    booking.totalCost = totalCost;
    booking.endTime = endTime;
    booking.car.status = 'available';
  }

  return await booking?.save();

  console.log({ timeDifferenceMinutes, totalCost });
};

export const carServices = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getSingleCarsfromDB,
  updateCarIntoDB,
  carReturn,
  deleteAcarFromDB,
};

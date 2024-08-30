import { Schema, model } from 'mongoose';
import { Tbooking } from './booking.interface';

const bookingSchema = new Schema<Tbooking>(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      // it will not send from client body rather i have to find from bearer token, do later one.
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const Booking = model<Tbooking>('Booking', bookingSchema);

import { Schema, model } from 'mongoose';
import { Tcars } from './cars.interface';

const carSchema = new Schema<Tcars>(
  {
    name: {
      type: String,
      required: [true, 'Car name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description name is required'],
    },
    color: {
      type: String,
      required: [true, 'color name is required'],
    },
    isElectric: {
      type: Boolean,
      required: [true, 'isElectric value is required'],
    },
    status: {
      type: String,
      enum: ['available', 'unavailabel'],
      default: 'available',
    },
    features: {
      type: [String],
      required: [true, 'Feature name is required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'pricePerHour  is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

export const Car = model<Tcars>('Car', carSchema);

import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config';
import AppError from '../../error/appError';
import { Tuser, userModel } from './user.interface';

const userSchema = new Schema<Tuser>(
  {
    name: {
      type: String,
      required: [true, 'Nmae is Required'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
    },
    phone: String,
    address: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});
userSchema.pre('save', async function (next) {
  const userMail = this.email;

  const isExist = await User.findOne({ email: userMail });
  if (isExist) {
    const error = new AppError(409, 'user already exist ');
    return next(error);
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  clientPassword,
  hashedPassword
) {
  return await bcrypt.compare(clientPassword, hashedPassword);
};

export const User = model<Tuser, userModel>('User', userSchema);

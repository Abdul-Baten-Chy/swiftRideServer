import { Tuser, TuserUpdate } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: Tuser) => {
  const user = await User.create(payload);
  return user;
};
const updateUserIntoDB = async (payload: TuserUpdate) => {
  const user = await User.findByIdAndUpdate(
    payload._id,
    { $set: payload },
    { new: true }
  );
  return user;
};
const getUserFromDB = async (payload: string) => {
  console.log(payload);

  const user = await User.findById(payload);

  return user;
};

export const userServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getUserFromDB,
};

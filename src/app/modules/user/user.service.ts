import { Tuser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: Tuser) => {
  const user = await User.create(payload);
  return user;
};

export const userServices = {
  createUserIntoDB,
};

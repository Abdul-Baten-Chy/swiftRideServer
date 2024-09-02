import { Model } from 'mongoose';

export interface Tuser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
}
export interface TuserUpdate {
  name?: string;
  email?: string;
  role?: 'user' | 'admin';
  password?: string;
  phone?: string;
  address?: string;
  _id?: string;
}

export interface userModel extends Model<Tuser> {
  isPasswordMatched(
    clientPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../app/error/appError';
import { User } from '../app/modules/user/user.model';
import catchAsyncAwait from '../app/utills/catchAsyncAwait';
import config from '../config/config';

const auth = (...requiredRoles: string[]) => {
  return catchAsyncAwait(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      console.log(token);

      // checking if the token is missing
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.secreteKey as string
      ) as JwtPayload;

      const { role, userEmail, iat } = decoded;

      // checking if the user is exist
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }
      // checking if the user is already deleted

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to perform the operation'
        );
      }

      req.user = decoded as JwtPayload;
      next();
    }
  );
};

export default auth;

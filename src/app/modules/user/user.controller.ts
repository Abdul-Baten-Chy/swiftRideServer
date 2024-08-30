// userConroller.createUser

import { Request, Response } from 'express';
import catchAsyncAwait from '../../utills/catchAsyncAwait';
import sendResponse from '../../utills/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsyncAwait(async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userServices.createUserIntoDB(payload);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: user,
  });
});

export const userConroller = {
  createUser,
};

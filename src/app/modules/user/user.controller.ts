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
const updateUser = catchAsyncAwait(async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userServices.updateUserIntoDB(payload);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Updated successfully',
    data: user,
  });
});
const getUser = catchAsyncAwait(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  const user = await userServices.getUserFromDB(id);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Updated successfully',
    data: user,
  });
});

export const userConroller = {
  createUser,
  updateUser,
  getUser,
};

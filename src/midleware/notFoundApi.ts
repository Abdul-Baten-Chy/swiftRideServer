import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFoundApi = (req: Request, res: Response, nest: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
};

export default notFoundApi;

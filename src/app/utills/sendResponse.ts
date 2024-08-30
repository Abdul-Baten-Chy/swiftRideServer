import { Response } from 'express';

type Tresponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: Tresponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data?.statusCode,
    message: data.message,
    data: data.data,
  });
};
export default sendResponse;

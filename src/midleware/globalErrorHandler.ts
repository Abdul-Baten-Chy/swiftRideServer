import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../app/error/appError';
import handleCastError from '../app/error/handleCastError';
import handleDuplicateError from '../app/error/handleDuplicateError';
import handleZodError from '../app/error/handleZodError';
import handleValidationError from '../app/error/mongooseValidation';
import { TErrorMessages } from '../app/interface/error';
import config from '../config/config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'somthing went wrong';
  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'somthing went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

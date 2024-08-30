import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsyncAwait from '../app/utills/catchAsyncAwait';

const requestVAlidator = (schema: AnyZodObject) => {
  return catchAsyncAwait(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    }
  );
};

export default requestVAlidator;

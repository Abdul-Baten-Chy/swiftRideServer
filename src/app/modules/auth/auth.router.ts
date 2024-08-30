import { Router } from 'express';
import requestVAlidator from '../../../midleware/requestValidator';
import { authController } from './auth.controller';
import { loginValidationSchema } from './auth.validation';

const router = Router();

router.post(
  '/signin',
  requestVAlidator(loginValidationSchema),
  authController.loginUser
);

export const authRoute = router;

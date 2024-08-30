import { Router } from 'express';
import requestVAlidator from '../../../midleware/requestValidator';
import { authController } from '../auth/auth.controller';
import { loginValidationSchema } from '../auth/auth.validation';
import { userConroller } from './user.controller';
import validateUser from './user.validation';

const router = Router();

router.post(
  '/signup',
  requestVAlidator(validateUser),
  userConroller.createUser
);
router.post(
  '/signin',
  requestVAlidator(loginValidationSchema),
  authController.loginUser
);

export const userRouter = router;

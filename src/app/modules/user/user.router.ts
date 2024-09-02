import { Router } from 'express';
import requestVAlidator from '../../../midleware/requestValidator';
import { authController } from '../auth/auth.controller';
import { loginValidationSchema } from '../auth/auth.validation';
import { userConroller } from './user.controller';
import validateUser from './user.validation';

const router = Router();

router.get('/:id', userConroller.getUser);
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
router.patch('/update', userConroller.updateUser);

export const userRouter = router;

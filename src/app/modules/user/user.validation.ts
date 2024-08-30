import { z } from 'zod';

const validateUser = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    password: z
      .string()
      .min(8, { message: 'Password can not be less than 8 characters' })
      .max(16, { message: 'Password can not be more than 16 characters' }),
    phone: z.string(),
    address: z.string(),
  }),
});
export default validateUser;

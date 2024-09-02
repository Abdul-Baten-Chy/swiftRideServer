import { z } from 'zod';

export const carValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailabel']).optional(),
    features: z.string().array(),
    images: z.string().array(),
    pricePerHour: z.number(),
    isDeleted: z.boolean(),
  }),
});
export const carValidationUpdate = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(['available', 'unavailabel']).optional(),
    features: z.string().array().optional(),
    pricePerHour: z.number().optional(),
    images: z.string().array().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

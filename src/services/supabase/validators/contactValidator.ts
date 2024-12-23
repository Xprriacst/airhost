import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  notes: z.string().optional()
});

export const validateContact = (data: unknown) => {
  return contactSchema.parse(data);
};

export const validatePartialContact = (data: unknown) => {
  return contactSchema.partial().parse(data);
};
import { z } from 'zod';
export const AuthLoginDtoSchema = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  });

export type AuthLoginDto = z.infer<typeof AuthLoginDtoSchema>;

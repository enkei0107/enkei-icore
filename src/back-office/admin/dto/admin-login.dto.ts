/** @format */

import { z } from "zod";

export const AdminLoginDtoSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
export type AdminLoginDto = z.infer<typeof AdminLoginDtoSchema>;

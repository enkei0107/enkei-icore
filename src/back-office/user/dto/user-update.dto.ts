/** @format */

import { z } from "zod";

export const UserUpdateDtoSchema = z.object({
	is_active: z.number().min(0).max(1),
});

export type UserUpdateDto = z.infer<typeof UserUpdateDtoSchema>;

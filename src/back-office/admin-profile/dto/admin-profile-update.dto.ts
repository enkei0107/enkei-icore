/** @format */

import { z } from "zod";

export const AdminProfileUpdateDtoSchema = z.object({
	username: z.string(),
	avatar: z.string().url(),
});
export type AdminProfileUpdateDto = z.infer<typeof AdminProfileUpdateDtoSchema>;

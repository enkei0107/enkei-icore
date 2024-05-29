/** @format */

import { z } from "zod";

export const AdminUpdateDtoSchema = z.object({
	is_active: z.number().max(1).min(0),
});
export type AdminUpdateDto = z.infer<typeof AdminUpdateDtoSchema>;

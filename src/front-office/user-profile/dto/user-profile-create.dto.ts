/** @format */

import { z } from "zod";
import { GenderEnum } from "../../../config/enum/user/user-gender.enum";
import { ReligionEnum } from "../../../config/enum/user/user-religion.enum";

export const UserProfileCreateDtoSchema = z.object({
	name: z.string(),
	gender: z.enum(Object.values(GenderEnum) as [string, ...string[]]),
	place_of_birth: z.string().max(50),
	date_of_birth: z.string().datetime(),
	religion: z.enum(Object.values(ReligionEnum) as [string, ...string[]]),
	avatar: z.string().url().optional().nullable(),
	properties: z.record(z.unknown()).optional(),
});
export type UserProfileCreateDto = z.infer<typeof UserProfileCreateDtoSchema>;

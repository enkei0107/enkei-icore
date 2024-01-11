/** @format */

import { z } from "zod";
import { UserContactProviderEnum } from "../../../config/enum/user/user-contact-provider.enum";

export const UserContactUpdateDtoSchema = z.object({
	provider: z
		.enum(Object.values(UserContactProviderEnum) as [string, ...string[]])
		.optional(),
	address: z.string().optional(),
	is_primary: z.number().min(0).max(1).optional(),
});

export type UserContactUpdateDto = z.infer<typeof UserContactUpdateDtoSchema>;

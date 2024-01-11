/** @format */

import { z } from "zod";
import { UserContactProviderEnum } from "../../../config/enum/user/user-contact-provider.enum";

export const UserContactCreateDtoSchema = z.object({
	provider: z.enum(
		Object.values(UserContactProviderEnum) as [string, ...string[]]
	),
	address: z.string(),
});

export type UserContactCreateDto = z.infer<typeof UserContactCreateDtoSchema>;

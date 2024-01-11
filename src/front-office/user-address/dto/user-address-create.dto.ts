/** @format */

import { z } from "zod";

export const UserAddressCreateDtoSchema = z.object({
	address: z.string(),
	sub_district: z.string(),
	district: z.string(),
	postal_code: z.string(),
	country: z.string(),
	properties: z.record(z.unknown())
});
export type UserAddressCreateDto = z.infer<typeof UserAddressCreateDtoSchema>;

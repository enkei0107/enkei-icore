/** @format */

import { z } from "zod";

export const BankCreateDtoSchema = z.object({
	name: z.string(),
	code: z.string(),
	logo: z.string().url()
});

export type BankCreateDto = z.infer<typeof BankCreateDtoSchema>;

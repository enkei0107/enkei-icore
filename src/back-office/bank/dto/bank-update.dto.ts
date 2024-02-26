/** @format */

import { z } from "zod";

export const BankUpdateDtoSchema = z.object({
	name: z.string().optional(),
	code: z.string().optional(),
	logo: z.string().url().optional(),
});

export type BankUpdateDto = z.infer<typeof BankUpdateDtoSchema>;

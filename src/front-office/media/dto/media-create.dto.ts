/** @format */

import { z } from "zod";

export const MediaCreateDtoSchema = z.object({
	file: z.string(),
});

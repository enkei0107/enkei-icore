/** @format */

import { z } from "zod";
import { SettingValueType } from "../../../config/enum/setting/setting-value-type.enum";

export const SettingCreateDtoSchema = z.object({
	name: z.string(),
	value: z.object({
		type: z.enum(Object.values(SettingValueType) as [string, ...string[]]),
		property: z.any(),
	}),
});
export type SettingCreateDto = z.infer<typeof SettingCreateDtoSchema>;

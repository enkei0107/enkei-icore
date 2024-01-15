/** @format */

import { z } from "zod";
import { SettingValueType } from "../../../config/enum/setting/setting-value-type.enum";

export const SettingUpdateDtoSchema = z.object({
	name: z.string().optional(),
	value: z
		.object({
			type: z.enum(Object.values(SettingValueType) as [string, ...string[]]),
			property: z.any(),
		})
		.optional(),
});
export type SettingUpdateDto = z.infer<typeof SettingUpdateDtoSchema>;

/** @format */

import { z } from "zod";
import { AdminRoleEnum } from "../../../config/enum/admin/admin-role.enum";

export const RoleAdminCreateDtoSchema = z.object({
	name: z.enum(Object.values(AdminRoleEnum) as [string, ...string[]]),
});
export type RoleAdminCreateDto = z.infer<typeof RoleAdminCreateDtoSchema>;

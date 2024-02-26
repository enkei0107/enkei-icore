/** @format */

import { z } from "zod";

export const RoleAdminPermissionCreateDtoSchema = z.object({
    role_id:z.string().uuid(),
	permission_id: z.array(z.string().uuid()),
});

export type RoleAdminPermissionCreateDto = z.infer<typeof RoleAdminPermissionCreateDtoSchema>;
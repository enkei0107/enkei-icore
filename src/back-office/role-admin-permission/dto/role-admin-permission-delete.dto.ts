import { z } from "zod";

export const RoleAdminPermissionDeleteDtoSchema = z.object({
    id:z.array(z.string().uuid())
});
export type RoleAdminPermissionDeleteDto = z.infer<typeof RoleAdminPermissionDeleteDtoSchema>;
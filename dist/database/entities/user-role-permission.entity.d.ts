import { Roles } from './role.entity';
import { Permissions } from './permission.entity';
export declare class UserRolePermissions {
    id: string;
    role: Roles;
    role_id: string;
    permission: Permissions;
    permission_id: string;
    created_at: Date;
    updated_at?: Date;
}
//# sourceMappingURL=user-role-permission.entity.d.ts.map
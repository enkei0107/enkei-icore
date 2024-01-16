/** @format */
import { UserProfiles } from "./user-profile.entity";
import { UserAddress } from "./user-address.entity";
import { UserContacts } from "./user-contact.entity";
import { UserRoles } from "./user-role.entity";
export declare class Users {
    id: string;
    username: string;
    password?: string;
    login_at: Date;
    remember_token?: string;
    avatar?: string;
    is_active: number;
    created_at: Date;
    updated_at?: Date;
    role?: UserRoles;
    profile?: UserProfiles;
    address?: UserAddress;
    contacts: UserContacts[];
}
//# sourceMappingURL=user.entity.d.ts.map
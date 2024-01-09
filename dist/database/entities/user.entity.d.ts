/** @format */
import { UserProfiles } from "./user-profile.entity";
import { UserAddress } from "./user-address.entity";
import { UserContacts } from "./user-contact.entity";
export declare class Users {
    id: string;
    username: string;
    password?: string;
    login_at: Date;
    remember_token?: string;
    avatar?: string;
    created_at: Date;
    updated_at?: Date;
    profile?: UserProfiles;
    address?: UserAddress;
    contacts: UserContacts[];
}
//# sourceMappingURL=user.entity.d.ts.map
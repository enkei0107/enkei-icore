/** @format */
import { Users } from "./user.entity";
export declare class UserAddress {
    id: string;
    address: string;
    postal_code: string;
    sub_district: string;
    district: string;
    properties: JSON;
    country: string;
    created_at: Date;
    updated_at?: Date;
    user: Users;
    user_id: string;
}
//# sourceMappingURL=user-address.entity.d.ts.map
import { FactorizedAttrs, Factory } from "@jorgebodega/typeorm-factory";
import dataSource from "../data-source";
import { faker } from "@faker-js/faker";
import { AdminRoleEnum } from "../../config/enum/admin/admin-role.enum";
import { RoleAdmins } from "../entities/role-admin.entity";

export class RoleAdminFactory extends Factory<RoleAdmins>{
    protected entity = RoleAdmins;
    protected dataSource = dataSource;
    protected currentRole = [];
    private roleUnique(): string {
        const data = faker.helpers.enumValue(AdminRoleEnum);
        if (!this.currentRole.includes(data)) {
            this.currentRole.push(data);
            return data;
        }
        return this.roleUnique();
    }
    protected attrs(): FactorizedAttrs<RoleAdmins> {
        return {
            name: this.roleUnique()
        }
    }

}
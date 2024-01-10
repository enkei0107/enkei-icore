"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSeeder = void 0;
const typeorm_seeding_1 = require("@jorgebodega/typeorm-seeding");
const user_account_type_enum_1 = require("../../config/enum/user/user-account-type.enum");
const role_entity_1 = require("../entities/role.entity");
const role_factory_1 = require("../factories/role.factory");
class RoleSeeder extends typeorm_seeding_1.Seeder {
    async run(dataSource) {
        console.log('\n Running RoleSeeder');
        const roleEnum = Object.values(user_account_type_enum_1.UserAccountTypeEnum);
        const role = await new role_factory_1.RolesFactory().createMany(roleEnum.length);
        await dataSource.createEntityManager().save(role_entity_1.Roles, role);
    }
}
exports.RoleSeeder = RoleSeeder;
//# sourceMappingURL=role.seeder.js.map
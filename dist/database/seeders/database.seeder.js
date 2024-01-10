"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@jorgebodega/typeorm-seeding");
const role_seeder_1 = require("./role.seeder");
class InitialDatabaseSeed extends typeorm_seeding_1.Seeder {
    async run(dataSource) {
        await new role_seeder_1.RoleSeeder().run(dataSource);
    }
}
exports.default = InitialDatabaseSeed;
//# sourceMappingURL=database.seeder.js.map
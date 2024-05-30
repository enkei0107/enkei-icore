import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm";
import { RoleSeeder } from "./role.seeder";
import { RoleAdminSeeder } from "./role-admin.seeder";
import { AdminSeeder } from "./admin.seeder";
import { PermissionSeeder } from "./permission.seeder";

export default class InitialDatabaseSeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
      await new RoleSeeder().run(dataSource);
      await new RoleAdminSeeder().run(dataSource);
      await new AdminSeeder().run(dataSource);
      await new PermissionSeeder().run(dataSource);
    }
  }
  
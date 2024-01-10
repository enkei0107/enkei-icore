import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm";
import { RoleSeeder } from "./role.seeder";

export default class InitialDatabaseSeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
      await new RoleSeeder().run(dataSource);
    }
  }
  
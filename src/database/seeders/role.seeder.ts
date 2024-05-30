import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm";
import { UserAccountTypeEnum } from "../../config/enum/user/user-account-type.enum";
import { Roles } from "../entities/role.entity";
import { RolesFactory } from "../factories/role.factory";

export class RoleSeeder extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
      console.log('\n Running RoleSeeder');
		  await dataSource.query(`TRUNCATE TABLE ROLES RESTART IDENTITY CASCADE`);
      const roleEnum = Object.values(UserAccountTypeEnum);
      const role: Roles[] = await new RolesFactory().createMany(roleEnum.length);
      await dataSource.createEntityManager().save(Roles, role);
    }
  }
  
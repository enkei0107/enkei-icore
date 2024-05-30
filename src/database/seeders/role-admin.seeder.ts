/** @format */

import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm";
import { AdminRoleEnum } from "../../config/enum/admin/admin-role.enum";
import { RoleAdmins } from "../entities/role-admin.entity";
import { RoleAdminFactory } from "../factories/role-admin.factory";

export class RoleAdminSeeder extends Seeder {
	async run(dataSource: DataSource): Promise<void> {
		console.log("\n Running RoleAdminSeeder");
		await dataSource.query(`TRUNCATE TABLE ROLE_ADMINS RESTART IDENTITY CASCADE`);
		const roleAdminEnum = Object.values(AdminRoleEnum);
		const role: RoleAdmins[] = await new RoleAdminFactory().createMany(
			roleAdminEnum.length
		);
		await dataSource.createEntityManager().save(RoleAdmins, role);
	}
}

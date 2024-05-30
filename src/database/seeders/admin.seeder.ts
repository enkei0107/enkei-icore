/** @format */

import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm";
import { AdminRoleEnum } from "../../config/enum/admin/admin-role.enum";
import { Admins } from "../entities/admin.entity";
import { AdminContacts } from "../entities/admin-contact.entity";
import * as bcrypt from "bcryptjs";
import { AdminContactProviderEnum } from "../../config/enum/admin/admin-contact-provider.enum";
import { RoleAdmins } from "../entities/role-admin.entity";
import { AdminRoles } from "../entities/admin-role.entity";

export class AdminSeeder extends Seeder {
	async run(dataSource: DataSource): Promise<void> {
		console.log("\n Running AdminSeeder");
		await dataSource.query(`TRUNCATE TABLE ADMINS RESTART IDENTITY CASCADE`);

		const adminRepository = dataSource.getRepository(Admins);
		const adminContactRepository = dataSource.getRepository(AdminContacts);

		const newAdmin = adminRepository.create({
			username: "super admin",
			password: await bcrypt.hash("Password@1", 10),
			login_at: new Date(),
		});
		const admin = await adminRepository.save(newAdmin);
		const newContacts = adminContactRepository.create({
			provider: AdminContactProviderEnum.EMAIL,
			address: "super@admin.com",
			admin: admin,
		});
		const contact = await adminContactRepository.save(newContacts);
		const role = await dataSource.manager.findOneOrFail(RoleAdmins, {
			where: {
				name: AdminRoleEnum.SUPER_ADMIN,
			},
		});
		const roleAdmin = dataSource.manager.create(AdminRoles, {
			admin: admin,
			role: role,
		});
		await dataSource.manager.save(AdminRoles, roleAdmin);
	}
}

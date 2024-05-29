/** @format */

import { Seeder } from "@jorgebodega/typeorm-seeding";
import { NestFactory } from "@nestjs/core";
import { DataSource } from "typeorm";
import { AdminModule } from "../../back-office/admin/admin.module";
import { AdminService } from "../../back-office/admin/admin.service";
import { AdminRoleEnum } from "../../config/enum/admin/admin-role.enum";
import { Admins } from "../entities/admin.entity";
import { AdminContacts } from "../entities/admin-contact.entity";

export class AdminSeeder extends Seeder {
	async run(dataSource: DataSource): Promise<void> {
		console.log("\n Running AdminSeeder");
		const adminRepository = dataSource.getRepository(Admins);
        const adminContactRepository = dataSource.getRepository(AdminContacts);
	}
}

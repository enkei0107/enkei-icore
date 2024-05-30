/** @format */

import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm";
import { Request } from "express";
import { PermissionService } from "../../back-office/permission/permission.service";
import { NestApplication } from "@nestjs/core";
import { Permissions } from "../entities/permission.entity";
import { endpoints } from "../factories/end-point.factory";
import { AdminRoles } from "../entities/admin-role.entity";
import { AdminRoleEnum } from "../../config/enum/admin/admin-role.enum";
import { AdminRoleHasPermissions } from "../entities/admin-role-has-permission.entity";

export class PermissionSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		console.log("\n Running PermissionSeeder");
		await dataSource.query(
			`TRUNCATE TABLE PERMISSIONS RESTART IDENTITY CASCADE`
		);
		await dataSource.manager.insert(Permissions, endpoints);
		const permissions = await dataSource.manager.find(Permissions);
		const roleAdmin = await dataSource.manager.findOneOrFail(AdminRoles, {
			where: {
				role: {
					name: AdminRoleEnum.SUPER_ADMIN,
				},
			},
		});
        const permissionAdminDataArray = permissions.map(permission => ({
            permission_id: permission.id,
            role_id: roleAdmin.role_id,
        }));
        await dataSource.manager.insert(AdminRoleHasPermissions, permissionAdminDataArray);
	}
}

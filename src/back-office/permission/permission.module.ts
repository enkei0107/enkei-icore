/** @format */

import { Module } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permissions } from "../../database/entities/permission.entity";
import { AdminRoleHasPermissions } from "../../database/entities/admin-role-has-permission.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Permissions, AdminRoleHasPermissions])],
	providers: [PermissionService],
	controllers: [PermissionController],
})
export class PermissionModule {}

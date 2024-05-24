/** @format */

import { Module } from "@nestjs/common";
import { RoleAdminService } from "./role-admin.service";
import { RoleAdminController } from "./role-admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleAdmins } from "../../database/entities/role-admin.entity";
import { Permissions } from "../../database/entities/permission.entity";
import { AdminRoleHasPermissions } from "../../database/entities/admin-role-has-permission.entity";
import { PermissionService } from "../permission/permission.service";
import { Reflector } from "@nestjs/core";
import { PermissionGuard } from "../../config/guard/permission.guard";

@Module({
	imports: [TypeOrmModule.forFeature([RoleAdmins,Permissions,AdminRoleHasPermissions])],
	providers: [RoleAdminService,PermissionService,Reflector,PermissionGuard],
	controllers: [RoleAdminController],
})
export class RoleAdminModule {}

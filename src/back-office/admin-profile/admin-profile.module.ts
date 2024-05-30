/** @format */

import { Module } from "@nestjs/common";
import { AdminProfileService } from "./admin-profile.service";
import { AdminProfileController } from "./admin-profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminContacts } from "../../database/entities/admin-contact.entity";
import { Admins } from "../../database/entities/admin.entity";
import { PermissionService } from "../permission/permission.service";
import { PermissionGuard } from "../../config/guard/permission.guard";
import { Reflector } from "@nestjs/core";
import { Permissions } from "../../database/entities/permission.entity";
import { AdminRoleHasPermissions } from "../../database/entities/admin-role-has-permission.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Admins, AdminContacts,Permissions,AdminRoleHasPermissions])],
	providers: [AdminProfileService,PermissionService,PermissionGuard,Reflector],
	controllers: [AdminProfileController],
})
export class AdminProfileModule {}

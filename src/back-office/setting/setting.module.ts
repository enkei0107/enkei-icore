/** @format */

import { Module } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Settings } from "../../database/entities/setting.entity";
import { PermissionService } from "../permission/permission.service";
import { Permissions } from "../../database/entities/permission.entity";
import { AdminRoleHasPermissions } from "../../database/entities/admin-role-has-permission.entity";
import { Reflector } from "@nestjs/core";
import { PermissionGuard } from "../../config/guard/permission.guard";

@Module({
	imports: [TypeOrmModule.forFeature([Settings,Permissions,AdminRoleHasPermissions])],
	providers: [SettingService,PermissionService,Reflector,PermissionGuard],
	controllers: [SettingController],
})
export class SettingModule {}

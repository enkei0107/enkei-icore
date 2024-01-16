/** @format */

import { Module } from "@nestjs/common";
import { PermissionModule } from "./permission/permission.module";
import { SettingModule } from './setting/setting.module';
import { AdminModule } from './admin/admin.module';
import { RoleAdminModule } from './role-admin/role-admin.module';

@Module({
	imports: [PermissionModule, SettingModule, AdminModule, RoleAdminModule],
})
export class BackOfficeModule {}

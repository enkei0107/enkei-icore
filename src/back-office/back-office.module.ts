/** @format */

import { Module } from "@nestjs/common";
import { PermissionModule } from "./permission/permission.module";
import { SettingModule } from "./setting/setting.module";
import { AdminModule } from "./admin/admin.module";
import { RoleAdminModule } from "./role-admin/role-admin.module";
import { UserModule } from "./user/user.module";
import { BankModule } from "./bank/bank.module";
import { RoleAdminPermissionModule } from "./role-admin-permission/role-admin-permission.module";
import { AdminProfileModule } from './admin-profile/admin-profile.module';

@Module({
	imports: [
		AdminModule,
		RoleAdminModule,
		PermissionModule,
		RoleAdminPermissionModule,
		SettingModule,
		AdminProfileModule,
		UserModule,
		BankModule,
	],
})
export class BackOfficeModule {}

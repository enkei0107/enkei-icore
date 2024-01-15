/** @format */

import { Module } from "@nestjs/common";
import { PermissionModule } from "./permission/permission.module";
import { SettingModule } from './setting/setting.module';

@Module({
	imports: [PermissionModule, SettingModule],
})
export class BackOfficeModule {}

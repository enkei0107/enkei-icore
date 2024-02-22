/** @format */

import { DatabaseModule } from "./database/database.module";
import { dataSourceOptions } from "./database/data-source";
import { AuthModule } from "./front-office/auth/auth.module";
import { AuthService } from "./front-office/auth/auth.service";
import { AuthController } from "./front-office/auth/auth.controller";
import { MediaModule } from "./front-office/media/media.module";
import { MediaController } from "./front-office/media/media.controller";
import { MediaService } from "./front-office/media/media.service";
import { FrontOfficeModule } from "./front-office/front-office.module";

// Back Office
import { BackOfficeModule } from "./back-office/back-office.module";
import { AdminModule } from "./back-office/admin/admin.module";
import { AdminService } from "./back-office/admin/admin.service";
import { AdminController } from "./back-office/admin/admin.controller";
import { PermissionModule } from "./back-office/permission/permission.module";
import { PermissionService } from "./back-office/permission/permission.service";
import { PermissionController } from "./back-office/permission/permission.controller";
import { RoleAdminModule } from "./back-office/role-admin/role-admin.module";
import { RoleAdminService } from "./back-office/role-admin/role-admin.service";
import { RoleAdminController } from "./back-office/role-admin/role-admin.controller";
import { SettingModule } from "./back-office/setting/setting.module";
import { SettingService } from "./back-office/setting/setting.service";
import { SettingController } from "./back-office/setting/setting.controller";
import { from } from "rxjs";



// package
export * from 'typeorm';
export * from 'zod';
export * from 'nestjs-zod';
export * from 'nestjs-paginate';
export * from '@faker-js/faker';
export * from '@nestjs/swagger';

export {
	DatabaseModule,
	dataSourceOptions,
	AuthModule,
	AuthService,
	AuthController,
	MediaModule,
	MediaService,
	MediaController,
	FrontOfficeModule,

	BackOfficeModule,
	AdminModule,
	AdminService,
	AdminController,
	RoleAdminModule,
	RoleAdminService,
	RoleAdminController,
	PermissionModule,
	PermissionService,
	PermissionController,
	SettingModule,
	SettingService,
	SettingController
};

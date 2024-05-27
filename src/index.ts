/** @format */

import { DatabaseModule } from "./database/database.module";
import { dataSourceOptions } from "./database/data-source";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./front-office/auth/auth.module";
import { AuthService } from "./front-office/auth/auth.service";
import { AuthController } from "./front-office/auth/auth.controller";
import { UserProfileModule } from "./front-office/user-profile/user-profile.module";
import { UserProfileService } from "./front-office/user-profile/user-profile.service";
import { UserProfileController } from "./front-office/user-profile/user-profile.controller";
import { UserAddressModule } from "./front-office/user-address/user-address.module";
import { UserAddressService } from "./front-office/user-address/user-address.service";
import { UserAddressController } from "./front-office/user-address/user-address.controller";
import { UserContactModule } from "./front-office/user-contact/user-contact.module";
import { UserContactService } from "./front-office/user-contact/user-contact.service";
import { UserContactController } from "./front-office/user-contact/user-contact.controller";
import { UserBankModule } from "./front-office/user-bank/user-bank.module";
import { UserBankService } from "./front-office/user-bank/user-bank.service";
import { UserBankController } from "./front-office/user-bank/user-bank.controller";
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
import { RoleAdminPermissionModule } from "./back-office/role-admin-permission/role-admin-permission.module";
import { RoleAdminPermissionService } from "./back-office/role-admin-permission/role-admin-permission.service";
import { RoleAdminPermissionController } from "./back-office/role-admin-permission/role-admin-permission.controller";
import { BankModule } from "./back-office/bank/bank.module";
import { BankService } from "./back-office/bank/bank.service";
import { BankController } from "./back-office/bank/bank.controller";
import { UserModule } from "./back-office/user/user.module";
import { UserService } from "./back-office/user/user.service";
import { UserController } from "./back-office/user/user.controller";
import { PermissionGuard } from "./config/guard/permission.guard";
import {Permissions} from "./config/decorator/permission.decorator";
import { JwtStrategy } from "./front-office/auth/jwt.strategy";
import { AdminJwtStrategy } from "./back-office/admin/admin.jwt.strategy";

// Seeder
import { RolesFactory } from "./database/factories/role.factory";
import { RoleAdminFactory } from "./database/factories/role-admin.factory";
import { RoleSeeder } from "./database/seeders/role.seeder";
import { RoleAdminSeeder } from "./database/seeders/role-admin.seeder";
import InitialDatabaseSeed from "./database/seeders/database.seeder";

// Package
export * from '@nestjs/core';
export * from 'typeorm';
export * from '@nestjs/typeorm';
export * from 'zod';
export * from 'nestjs-zod';
export * from 'nestjs-paginate';
export * from '@faker-js/faker';
export * from '@nestjs/swagger';
export * from '@nestjs/jwt';
export * from '@nestjs/passport';
export {
	PermissionGuard,
	JwtStrategy,
	AdminJwtStrategy,
	Permissions,
	DatabaseModule,
	dataSourceOptions,

	// Seeder
	RolesFactory,
	RoleAdminFactory,
	RoleSeeder,
	RoleAdminSeeder,
	InitialDatabaseSeed,
	

	// Front Office
	AuthModule,
	AuthService,
	AuthController,
	UserProfileModule,
	UserProfileService,
	UserProfileController,
	UserAddressModule,
	UserAddressService,
	UserAddressController,
	UserContactModule,
	UserContactService,
	UserContactController,
	UserBankModule,
	UserBankService,
	UserBankController,
	MediaModule,
	MediaService,
	MediaController,
	FrontOfficeModule,

	// Back Office
	BackOfficeModule,
	AdminModule,
	AdminService,
	AdminController,
	RoleAdminModule,
	RoleAdminService,
	RoleAdminController,
	RoleAdminPermissionModule,
	RoleAdminPermissionService,
	RoleAdminPermissionController,
	BankModule,
	BankService,
	BankController,
	UserModule,
	UserService,
	UserController,
	PermissionModule,
	PermissionService,
	PermissionController,
	SettingModule,
	SettingService,
	SettingController
};

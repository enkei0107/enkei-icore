/** @format */

import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../database/entities/user.entity";
import { PermissionService } from "../permission/permission.service";
import { Permissions } from "../../database/entities/permission.entity";
import { AdminRoleHasPermissions } from "../../database/entities/admin-role-has-permission.entity";
import { Reflector } from "@nestjs/core";
import { PermissionGuard } from "../../config/guard/permission.guard";

@Module({
	imports: [TypeOrmModule.forFeature([Users,Permissions,AdminRoleHasPermissions])],
	providers: [UserService,PermissionService,Reflector,PermissionGuard],
	controllers: [UserController],
})
export class UserModule {}

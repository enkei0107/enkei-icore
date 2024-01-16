/** @format */

import { Module } from "@nestjs/common";
import { RoleAdminService } from "./role-admin.service";
import { RoleAdminController } from "./role-admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleAdmins } from "../../database/entities/role-admin.entity";

@Module({
	imports: [TypeOrmModule.forFeature([RoleAdmins])],
	providers: [RoleAdminService],
	controllers: [RoleAdminController],
})
export class RoleAdminModule {}

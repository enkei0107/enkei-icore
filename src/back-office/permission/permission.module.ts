/** @format */

import { Module } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permissions } from "../../database/entities/permission.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Permissions])],
	providers: [PermissionService],
	controllers: [PermissionController],
})
export class PermissionModule {}

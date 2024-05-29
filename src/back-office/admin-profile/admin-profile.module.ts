/** @format */

import { Module } from "@nestjs/common";
import { AdminProfileService } from "./admin-profile.service";
import { AdminProfileController } from "./admin-profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminContacts } from "../../database/entities/admin-contact.entity";
import { Admins } from "../../database/entities/admin.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Admins, AdminContacts])],
	providers: [AdminProfileService],
	controllers: [AdminProfileController],
})
export class AdminProfileModule {}

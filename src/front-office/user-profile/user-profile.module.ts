/** @format */

import { Module } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { UserProfileController } from "./user-profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../database/entities/user.entity";
import { UserProfiles } from "../../database/entities/user-profile.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Users, UserProfiles])],
	providers: [UserProfileService],
	controllers: [UserProfileController],
})
export class UserProfileModule {}

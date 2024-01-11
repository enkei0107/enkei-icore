/** @format */

import { Module } from "@nestjs/common";
import { UserContactService } from "./user-contact.service";
import { UserContactController } from "./user-contact.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserContacts } from "../../database/entities/user-contact.entity";

@Module({
	imports: [TypeOrmModule.forFeature([UserContacts])],
	providers: [UserContactService],
	controllers: [UserContactController],
})
export class UserContactModule {}

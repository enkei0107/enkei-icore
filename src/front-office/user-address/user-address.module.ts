/** @format */

import { Module } from "@nestjs/common";
import { UserAddressService } from "./user-address.service";
import { UserAddressController } from "./user-address.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAddress } from "../../database/entities/user-address.entity";

@Module({
	imports: [TypeOrmModule.forFeature([UserAddress])],
	providers: [UserAddressService],
	controllers: [UserAddressController],
})
export class UserAddressModule {}

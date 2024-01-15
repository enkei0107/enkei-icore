/** @format */

import { Module } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Settings } from "../../database/entities/setting.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Settings])],
	providers: [SettingService],
	controllers: [SettingController],
})
export class SettingModule {}

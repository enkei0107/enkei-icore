/** @format */

import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Settings } from "../../database/entities/setting.entity";
import { Repository } from "typeorm";
import { SettingCreateDto } from "./dto/setting-create.dto";
import { SettingUpdateDto } from "./dto/setting-update.dto";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";

@Injectable()
export class SettingService implements OnModuleInit {
	private static settings: Record<string, any> = {};
	constructor(
		@InjectRepository(Settings)
		private readonly settingRepository: Repository<Settings>
	) {}
	async onModuleInit() {
		try {
			await this.loadSetting();
		} catch (error) {
			throw error;
		}
	}

	async loadSetting() {
		const allSettings = await this.settingRepository.find();
		if (allSettings) {
			SettingService.settings = allSettings.reduce((acc, setting) => {
				const key = setting.name;
				acc[key] = setting.value;
				return acc;
			}, {});
		}
	}
	getValue(settingName: string) {
		return SettingService.settings[settingName];
	}

	async create(createDto: SettingCreateDto) {
		const data = this.settingRepository.create(createDto);
		await this.settingRepository.save(data);
		await this.loadSetting();
	}
	async findOneByIdOrFail(id: string) {
		return await this.settingRepository.findOneOrFail({
			where: {
				id,
			},
		});
	}
	async paginate(query: PaginateQuery): Promise<Paginated<Settings>> {
		return paginate(query, this.settingRepository, {
			defaultLimit: 10,
			sortableColumns: ["created_at", "name"],
			defaultSortBy: [["name", "ASC"]],
			filterableColumns: {
				name: true,
			},
		});
	}
	async update(id: string, updateDto: SettingUpdateDto) {
		await this.settingRepository.findOneByOrFail({ id });
		await this.settingRepository.update(id, updateDto);
		await this.loadSetting();
	}
	async remove(id: string) {
		await this.settingRepository.findOneByOrFail({ id });
		await this.loadSetting();
	}
}

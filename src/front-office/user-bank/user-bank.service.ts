/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserBanks } from "../../database/entities/user-bank.entity";
import { EntityManager, Repository } from "typeorm";
import { UserBankCreateDto } from "./dto/user-bank-create.dto";
import { PaginateQuery, paginate } from "nestjs-paginate";
import { UserBankUpdateDto } from "./dto/user-bank-update.dto";

@Injectable()
export class UserBankService {
	constructor(
		@InjectRepository(UserBanks)
		private readonly userBankRepository: Repository<UserBanks>
	) {}

	async create(createDto: UserBankCreateDto, user_id: string) {
		const exist = await this.userBankRepository.findOne({
			where: {
				user_id: user_id,
				is_primary: 1,
			},
		});
		var payload = { ...createDto, user_id: user_id, is_primary: exist ? 0 : 1 };
		const data = this.userBankRepository.create(payload);
		return await this.userBankRepository.save(data);
	}

	async paginate(query: PaginateQuery, user_id: string) {
		return paginate(query, this.userBankRepository, {
			defaultLimit: 10,
			sortableColumns: ["created_at"],
			relations: ["bank"],
			where: {
				user_id: user_id,
			},
		});
	}
	async show(id: string, user_id: string) {
		return await this.userBankRepository.findOneOrFail({
			where: {
				id: id,
				user_id: user_id,
			},
		});
	}
	async update(id: string, user_id: string, updateDto: UserBankUpdateDto) {
		return this.userBankRepository.manager.transaction(
			async (manager: EntityManager) => {
				try {
					await manager.findOneOrFail(UserBanks, {
						where: {
							id: id,
							user_id: user_id,
						},
					});
					if (updateDto?.is_primary == 1) {
						await manager.update(
							UserBanks,
							{ user_id: user_id },
							{
								is_primary: 0,
							}
						);
					}
					await manager.update(UserBanks, id, updateDto);
				} catch (error) {
					throw error;
				}
			}
		);
	}

	async remove(id: string, user_id: string) {
		await this.userBankRepository.findOneOrFail({
			where: {
				id: id,
				user_id: user_id,
			},
		});
		return await this.userBankRepository.delete(id);
	}
}

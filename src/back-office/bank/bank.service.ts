/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Banks } from "../../database/entities/bank.entity";
import { Repository } from "typeorm";
import { BankCreateDto } from "./dto/bank-create.dto";
import { BankUpdateDto } from "./dto/bank-update.dto";
import { PaginateQuery, paginate } from "nestjs-paginate";

@Injectable()
export class BankService {
	constructor(
		@InjectRepository(Banks)
		private readonly bankRepository: Repository<Banks>
	) {}
	async paginate(query: PaginateQuery) {
		return paginate(query, this.bankRepository, {
			defaultLimit: 10,
			sortableColumns: ["created_at", "name"],
			defaultSortBy: [["name", "ASC"]],
			filterableColumns: {
				name: true,
				code: true,
			},
		});
	}
	async create(createDto: BankCreateDto) {
		const data = this.bankRepository.create(createDto);
		return this.bankRepository.save(data);
	}

	async show(id: string) {
		return await this.bankRepository.findOneOrFail({ where: { id } });
	}
	async update(id: string, updateDto: BankUpdateDto) {
		await this.bankRepository.findOneOrFail({ where: { id } });
		return this.bankRepository.update(id, updateDto);
	}

	async remove(id: string) {
		await this.bankRepository.findOneOrFail({ where: { id } });
		return await this.bankRepository.delete(id);
	}
}

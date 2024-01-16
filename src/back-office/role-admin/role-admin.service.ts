/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleAdmins } from "../../database/entities/role-admin.entity";
import { Repository } from "typeorm";
import { RoleAdminCreateDto } from "./dto/role-admin-create.dto";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";

@Injectable()
export class RoleAdminService {
	constructor(
		@InjectRepository(RoleAdmins)
		private readonly roleRepository: Repository<RoleAdmins>
	) {}
	async paginate(query: PaginateQuery): Promise<Paginated<RoleAdmins>> {
		return paginate(query, this.roleRepository, {
			defaultLimit: 10,
			sortableColumns: ["created_at"],
			defaultSortBy: [["created_at", "DESC"]],
		});
	}
	async create(createDto: RoleAdminCreateDto): Promise<RoleAdmins> {
		const data = this.roleRepository.create(createDto);
		return await this.roleRepository.save(data);
	}
	async update(id: string, updateDto: RoleAdminCreateDto) {
		await this.roleRepository.findOneByOrFail({ id });
		return await this.roleRepository.update(id, updateDto);
	}
	async remove(id: string) {
		await this.roleRepository.findOneByOrFail({ id });
		await this.roleRepository.delete(id);
	}
}

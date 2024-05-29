/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admins } from "../../database/entities/admin.entity";
import { Repository } from "typeorm";
import { AdminProfileUpdateDto } from "./dto/admin-profile-update.dto";
import { AdminContacts } from "../../database/entities/admin-contact.entity";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";
import { AdminUpdateDto } from "./dto/admin-update.dto";

@Injectable()
export class AdminProfileService {
	constructor(
		@InjectRepository(Admins)
		private readonly adminRepository: Repository<Admins>,

		@InjectRepository(AdminContacts)
		private readonly adminContactRepository: Repository<AdminContacts>
	) {}

	async getProfile(id: string): Promise<Admins> {
		return await this.adminRepository.findOneOrFail({
			where: {
				id: id,
			},
			relations: ["contacts", "admin_role.role"],
		});
	}
	async updateProfile(id: string, updateDto: AdminProfileUpdateDto) {
		await this.adminRepository.findOneOrFail({
			where: {
				id: id,
			},
		});
		return await this.adminRepository.update(id, updateDto);
	}

	async adminPaginate(query: PaginateQuery): Promise<Paginated<Admins>> {
		return paginate(query, this.adminRepository, {
			defaultLimit: 15,
			relations: ["contacts", "admin_role.role"],
			sortableColumns: ["created_at", "username", "is_active"],
			defaultSortBy: [["created_at", "DESC"]],
		});
	}

	async adminUpdate(id: string, updateDto: AdminUpdateDto) {
		await this.adminRepository.findOneOrFail({
			where: {
				id: id,
			},
		});
		return await this.adminRepository.update(id, updateDto);
	}
    async adminRemove(id:string){
        await this.adminRepository.findOneOrFail({
			where: {
				id: id,
			},
		});
        return await this.adminRepository.delete(id);
    }
}

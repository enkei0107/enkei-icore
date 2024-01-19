/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../database/entities/user.entity";
import { Repository } from "typeorm";
import { PaginateQuery, paginate } from "nestjs-paginate";
import { UserUpdateDto } from "./dto/user-update.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>
	) {}
	async paginate(query: PaginateQuery) {
		return paginate(query, this.usersRepository, {
			defaultLimit: 10,
			sortableColumns: ["created_at"],
			defaultSortBy: [["created_at", "DESC"]],
			relations: {
				contacts: true,
				profile: true,
				address: true,
			},
		});
	}
	async findOneById(id: string) {
		return await this.usersRepository.findOneOrFail({
			where: {
				id,
			},
			relations: {
				contacts: true,
				address: true,
				profile: true,
			},
		});
	}
	async updateStatusUser(id: string, updateDto: UserUpdateDto) {
		await this.usersRepository.findOneByOrFail({ id });
		return await this.usersRepository.update(id, updateDto);
	}

    async remove(id:string){
		await this.usersRepository.findOneByOrFail({ id });
        return await this.usersRepository.delete(id);
    }
}

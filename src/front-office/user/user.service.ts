/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>
	) {}

	async findOne(id: string): Promise<Users> {
		return await this.usersRepository.findOne({
			where: {
				id,
			},
			relations:[
				'role.role'
			]
		});
	}
}

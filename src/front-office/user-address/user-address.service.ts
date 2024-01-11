/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAddress } from "../../database/entities/user-address.entity";
import { Repository } from "typeorm";
import { Users } from "../../database/entities/user.entity";
import { UserAddressCreateDto } from "./dto/user-address-create.dto";

@Injectable()
export class UserAddressService {
	constructor(
		@InjectRepository(UserAddress)
		private readonly userAddressRepository: Repository<UserAddress>
	) {}

	async updateOrCreate(
		user: Users,
		userAddressDto: UserAddressCreateDto
	): Promise<UserAddress> {
		const result = await this.userAddressRepository.findOneBy({
			user: user,
		});

		if (result) {
			await this.userAddressRepository.update(
				{ user_id: user.id },
				userAddressDto
			);
			return await this.userAddressRepository.findOneBy({ user_id: user.id });
		} else {
			const newAddress = this.userAddressRepository.create({
				...userAddressDto,
				user: user,
			});
			return await this.userAddressRepository.save(newAddress);
		}
	}
}

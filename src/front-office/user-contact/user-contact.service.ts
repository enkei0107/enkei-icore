/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserContacts } from "../../database/entities/user-contact.entity";
import { EntityManager, Not, Repository } from "typeorm";
import { UserContactCreateDto } from "./dto/user-contact-create.dto";
import { Users } from "../../database/entities/user.entity";
import { UserContactUpdateDto } from "./dto/user-contact-update.dto";

@Injectable()
export class UserContactService {
	constructor(
		@InjectRepository(UserContacts)
		private readonly userContactRepository: Repository<UserContacts>
	) {}

	async create(
		createDto: UserContactCreateDto,
		user: Users
	): Promise<UserContacts> {
		const exist = await this.userContactRepository.findOne({
			where: {
				user_id: user.id,
				is_primary: 1,
				provider: createDto.provider,
			},
		});
		const data = this.userContactRepository.create({
			provider: createDto.provider,
			address: createDto.address,
			is_primary: exist ? 0 : 1,
			user: user,
		});
		return await this.userContactRepository.save(data);
	}
	async update(id: string, updateDto: UserContactUpdateDto, user: Users) {
		this.userContactRepository.manager.transaction(
			async (manager: EntityManager) => {
				try {
					const exist = await manager.findOneOrFail(UserContacts, {
						where: {
							id: id,
							user_id: user.id,
						},
					});
					if (updateDto.is_primary === 1) {
						const existPrimaryContact = await manager.find(UserContacts, {
							where: {
								user_id: user.id,
								provider: exist.provider,
								address: Not(exist.address),
							},
						});
						if (existPrimaryContact) {
							await manager.update(
								UserContacts,
								{
									user_id: user.id,
									provider: exist.provider,
									address: Not(exist.address),
								},
								{
									is_primary: 0,
								}
							);
							return await manager.update(UserContacts, id, updateDto);
						}
					}
					return await manager.update(UserContacts, id, updateDto);
				} catch (error) {
					throw error;
				}
			}
		);
	}
	async remove(id: string, user: Users) {
		const data = await this.userContactRepository.findOneOrFail({
			where: {
				id: id,
				user_id:user.id,
			},
		});
		if ((data.is_primary === 1)) {
			throw new Error("Contact Can't be deleted because is primary contact");
		}
		return await this.userContactRepository.delete(id);
	}
}

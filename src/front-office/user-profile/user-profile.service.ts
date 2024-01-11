/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../database/entities/user.entity";
import { EntityManager, Repository } from "typeorm";
import { UserProfiles } from "../../database/entities/user-profile.entity";
import { UserProfileCreateDto } from "./dto/user-profile-create.dto";

@Injectable()
export class UserProfileService {
	constructor(
		@InjectRepository(Users)
		private readonly userRepository: Repository<Users>,

		@InjectRepository(UserProfiles)
		private readonly userProfileRepository: Repository<UserProfiles>
	) {}

	async updateOrCreate(
		createUserProfileDto: UserProfileCreateDto,
		user: Users
	): Promise<UserProfiles> {
		return this.userProfileRepository.manager.transaction(
			async (manager: EntityManager) => {
				try {
					if (createUserProfileDto.avatar) {
						await manager.update(Users, user.id, {
							avatar: createUserProfileDto.avatar,
						});
					}
					const profileExisting = await manager.findOne(UserProfiles, {
						where: {
							user_id: user.id,
						},
					});
					if (profileExisting) {
						await manager.update(
							UserProfiles,
							{ user_id: user.id },
							{
								name: createUserProfileDto.name,
								gender: createUserProfileDto.gender,
								place_of_birth: createUserProfileDto.place_of_birth,
								religion: createUserProfileDto.religion,
								properties: createUserProfileDto.properties,
							}
						);
						return await manager.findOne(UserProfiles, {
							where: { user_id: user.id },
						});
					} else {
						const profile = manager.create(UserProfiles, {
							name: createUserProfileDto.name,
							gender: createUserProfileDto.gender,
							date_of_birth: createUserProfileDto.date_of_birth,
							place_of_birth: createUserProfileDto.place_of_birth,
							religion: createUserProfileDto.religion,
							properties: createUserProfileDto.properties,
							user: user,
						});
						return await manager.save(UserProfiles, profile);
					}
				} catch (error) {
					throw error;
				}
			}
		);
	}
	async findOneByOrFail(user: Users): Promise<Users> {
		return await this.userRepository.findOneOrFail({
			where: {
				id: user?.id,
			},
			relations: {
				profile: true,
				contacts: true,
				address: true,
			},
		});
	}
}

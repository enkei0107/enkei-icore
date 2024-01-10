/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../database/entities/user.entity";
import { EntityManager, Repository } from "typeorm";
import { UserContacts } from "../../database/entities/user-contact.entity";
import { UserRoles } from "../../database/entities/user-role.entity";
import { Roles } from "../../database/entities/role.entity";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { UserContactProviderEnum } from "../../config/enum/user/user-contact-provider.enum";
import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from "./dto/auth-login.dto";
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Users)
		private readonly userRepository: Repository<Users>,

		@InjectRepository(UserContacts)
		private readonly userContactRepository: Repository<UserContacts>,

		@InjectRepository(UserRoles)
		private readonly userRoleRepository: Repository<UserRoles>,

		@InjectRepository(Roles)
		private readonly roleRepository: Repository<Roles>
	) {}

	async register(registerDto: AuthRegisterDto): Promise<Users> {
		return this.userRepository.manager.transaction(
			async (manager: EntityManager) => {
				try {
					const uniqueEmail = await manager.findOne(UserContacts,{
						where: {
							provider: UserContactProviderEnum.EMAIL,
							address: registerDto.email.toLocaleLowerCase(),
						  }
					});
					if (uniqueEmail) {
						throw new Error("The Email Has Been Taken");
					}
					const role = await manager.findOneOrFail(Roles,{
						where:{
							name:registerDto.role
						}
					});
					const hashedPassword = await bcrypt.hash(registerDto.password, 10);
					const newUser = manager.create(Users, {
						username: registerDto.username,
						password: hashedPassword,
						login_at: new Date(),
					  });
					  await manager.save(Users, newUser);
					  const newContacts = manager.create(UserContacts, {
						provider: UserContactProviderEnum.EMAIL,
						address: registerDto.email.toLocaleLowerCase(),
						user: newUser,
					  });
					  const userRole = manager.create(UserRoles, {
						user: newUser,
						role: role,
					  });
					  await manager.save(UserContacts, newContacts);
					  await manager.save(UserRoles, userRole);
					  return await manager.findOneOrFail(Users, {
						where: {
						  id: newUser.id,
						},
						relations: ['role.role'],
					  });
				} catch (error) {
					throw error;
				}
			}
		);
	}
	async login(loginDto:AuthLoginDto):Promise<Users>{
		const user = await this.userContactRepository.findOne({
			where: {
			  provider: UserContactProviderEnum.EMAIL,
			  address: loginDto.email.toLocaleLowerCase(),
			  is_primary: true,
			},
			relations: ['user', 'user.role.role'],
		  });
		  if (
			user &&
			bcrypt.compareSync(loginDto.password, user['user'].password)
		  ) {
			return user['user'];
		  }
		  throw new Error('Email or Password is invalid');
	}
}

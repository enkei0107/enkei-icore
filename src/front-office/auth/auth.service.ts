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
import * as bcrypt from "bcryptjs";
import { AuthLoginDto } from "./dto/auth-login.dto";
import axios, { AxiosResponse } from "axios";
import { AuthOauthFormatDto } from "./dto/auth-oauth-format.dto";
import { AuthOauth2Dto } from "./dto/auth-oauth2.dto";
import { OauthProviderEnum } from "../../config/enum/auth/oauth-provider.enum";
import { UserAccountTypeEnum } from "../../config/enum/user/user-account-type.enum";
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
					const uniqueEmail = await manager.findOne(UserContacts, {
						where: {
							provider: UserContactProviderEnum.EMAIL,
							address: registerDto.email.toLocaleLowerCase(),
						},
					});
					if (uniqueEmail) {
						throw new Error("The Email Has Been Taken");
					}
					const role = await manager.findOneOrFail(Roles, {
						where: {
							name: registerDto.role,
						},
					});
					const hashedPassword = await bcrypt.hash(registerDto.password, 10);
					const newUser = manager.create(Users, {
						username: await this.generatedUniqueUsername(registerDto.username),
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
						relations: ["role.role"],
					});
				} catch (error) {
					throw error;
				}
			}
		);
	}
	async login(loginDto: AuthLoginDto): Promise<Users> {
		const user = await this.userContactRepository.findOne({
			where: {
				provider: UserContactProviderEnum.EMAIL,
				address: loginDto.email.toLocaleLowerCase(),
				is_primary: 1,
			},
			relations: ["user", "user.role.role"],
		});
		if (user && bcrypt.compareSync(loginDto.password, user["user"].password)) {
			return user["user"];
		}
		throw new Error("Email or Password is invalid");
	}
	async oauth2(oauthDto: AuthOauth2Dto) {
		try {
			let data: AuthOauthFormatDto;
			switch (oauthDto.provider) {
				case OauthProviderEnum.GOOGLE:
					data = await this.oauthGoogle(oauthDto.token);
					break;
				case OauthProviderEnum.GITHUB:
					data = await this.oauthGithub(oauthDto.token);
					break;
				default:
					return null;
			}
			const findUser = await this.userContactRepository.findOne({
				where: {
					provider: UserContactProviderEnum.EMAIL,
					address: data.email,
					is_primary: 1,
				},
				relations: ["user", "user.role.role"],
			});
			if (findUser) {
				return findUser["user"];
			} else {
				return this.userRepository.manager.transaction(
					async (manager: EntityManager) => {
						const role = await this.roleRepository.findOneOrFail({
							where: {
								name: UserAccountTypeEnum.BASIC,
							},
						});
						const new_user = this.userRepository.create({
							username: await this.generatedUniqueUsername(data.name),
							avatar: data.avatar,
							login_at: new Date(),
						});
						await this.userRepository.save(new_user);
						const user_role = this.userRoleRepository.create({
							user: new_user,
							role: role,
						});
						await this.userRoleRepository.save(user_role);

						//create user contacts
						const user_contacts = this.userContactRepository.create({
							provider: UserContactProviderEnum.EMAIL,
							address: data.email,
							is_verified: 1,
							user: new_user,
						});
						await this.userContactRepository.save(user_contacts);
						return manager.findOneOrFail(Users, {
							where: {
								id: new_user.id,
							},
							relations: ["role.role"],
						});
					}
				);
			}
		} catch (error) {
			throw error;
		}
	}
	protected async oauthGithub(
		accessToken: string
	): Promise<AuthOauthFormatDto> {
		try {
			const getEmail: AxiosResponse = await axios.get(
				"https://api.github.com/user/emails",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const getUserInfo: AxiosResponse = await axios.get(
				"https://api.github.com/user",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			return {
				email: getEmail?.data[0]?.email.toLowerCase(),
				name: getUserInfo?.data?.name,
				avatar: getUserInfo?.data?.avatar_url,
			};
		} catch (error) {
			throw error;
		}
	}
	protected async oauthGoogle(
		accessToken: string
	): Promise<AuthOauthFormatDto> {
		try {
			const getUserInfo: AxiosResponse = await axios.get(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			return {
				email: getUserInfo?.data.email.toLowerCase(),
				name: getUserInfo?.data?.name,
				avatar: getUserInfo?.data?.picture,
			};
		} catch (error) {
			throw error;
		}
	}
	protected async generatedUniqueUsername(
		baseUsername: string,
		suffix: number = 1
	): Promise<string> {
		const username = suffix === 1 ? baseUsername : `${baseUsername} ${suffix}`;

		const existingUser = await this.userRepository.findOne({
			where: {
				username: username,
			},
		});
		if (existingUser) {
			return this.generatedUniqueUsername(baseUsername, suffix + 1);
		}

		return username;
	}
}

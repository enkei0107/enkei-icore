/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admins } from "../../database/entities/admin.entity";
import { EntityManager, Repository } from "typeorm";
import { AdminContacts } from "../../database/entities/admin-contact.entity";
import { RoleAdmins } from "../../database/entities/role-admin.entity";
import { AdminRoles } from "../../database/entities/admin-role.entity";
import { AdminRegisterDto } from "./dto/admin-register.dto";
import { UserContactProviderEnum } from "../../config/enum/user/user-contact-provider.enum";
import * as bcrypt from "bcryptjs";
import { AdminLoginDto } from "./dto/admin-login.dto";

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(Admins)
		private readonly adminRepository: Repository<Admins>,

		@InjectRepository(AdminContacts)
		private readonly adminContactRepository: Repository<AdminContacts>,

		@InjectRepository(RoleAdmins)
		private readonly adminRoleRepository: Repository<RoleAdmins>,

		@InjectRepository(AdminRoles)
		private readonly roleRepository: Repository<AdminRoles>
	) {}

	async register(registerDto: AdminRegisterDto): Promise<Admins> {
		return this.adminRepository.manager.transaction(
			async (manager: EntityManager) => {
				try {
					const uniqueEmail = await manager.findOne(AdminContacts, {
						where: {
							provider: UserContactProviderEnum.EMAIL,
							address: registerDto.email,
						},
					});
					if (uniqueEmail) {
						throw new Error("The Email Has Been Taken");
					}
					const role = await manager.findOneOrFail(RoleAdmins, {
						where: {
							name: registerDto.role,
						},
					});
					const hashed_password = await bcrypt.hash(registerDto.password, 10);
					const newUser = manager.create(Admins, {
						username: registerDto.username,
						password: hashed_password,
						login_at: new Date(),
					});
					const user = await manager.save(Admins, newUser);
					const contact = manager.create(AdminContacts, {
						provider: UserContactProviderEnum.EMAIL,
						address: registerDto.email,
						admin: user,
					});
					await manager.save(AdminContacts, contact);
					const roleAdmin = manager.create(AdminRoles, {
						admin: user,
						role_id: role.id,
					});
					await manager.save(AdminRoles, roleAdmin);
					return newUser;
				} catch (error) {
					throw error;
				}
			}
		);
	}
	async login(loginDto: AdminLoginDto): Promise<Admins> {
		const user = await this.adminContactRepository.findOne({
			where: {
				provider: UserContactProviderEnum.EMAIL,
				address: loginDto.email,
			},
			relations: ["admin.admin_role.role"],
		});
		if (user && bcrypt.compareSync(loginDto.password, user["admin"].password)) {
			if (user?.admin?.is_active != 1) {
				throw new Error("User Has been deactivated ,contact your administrator");
			}
			return user.admin;
		}
		throw new Error("Email or Password is invalid");
	}
	async findOne(id: string) {
		return await this.adminRepository.findOne({
			where: { id },
			relations: ["admin_role.role"],
		});
	}
}

/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRoleHasPermissions } from "../../database/entities/admin-role-has-permission.entity";
import { EntityManager, Repository } from "typeorm";
import { PaginateQuery, paginate } from "nestjs-paginate";
import { RoleAdminPermissionCreateDto } from "./dto/role-admin-permission-create.dto";
import { RoleAdminPermissionDeleteDto } from "./dto/role-admin-permission-delete.dto";

@Injectable()
export class RoleAdminPermissionService {
	constructor(
		@InjectRepository(AdminRoleHasPermissions)
		private readonly adminRoleHasPermissionRepository: Repository<AdminRoleHasPermissions>
	) {}

	async paginate(query: PaginateQuery, role_id: string) {
		return paginate(query, this.adminRoleHasPermissionRepository, {
			defaultLimit: 15,
			relations: ["permission"],
			sortableColumns: ["permission.end_point"],
			defaultSortBy: [["permission.end_point", "ASC"]],
			where: {
				role_id: role_id,
			},
		});
	}

	async create(createDto: RoleAdminPermissionCreateDto) {
		return this.adminRoleHasPermissionRepository.manager.transaction(
			async (manager: EntityManager) => {
				try {
					createDto.permission_id.forEach(async (element) => {
						const exist = await manager.findOne(AdminRoleHasPermissions, {
							where: {
								role_id: createDto.role_id,
								permission_id: element,
							},
						});
						if (!exist) {
							const data = manager.create(AdminRoleHasPermissions, {
								role_id:createDto.role_id,
								permission_id:element
							});
							await manager.save(AdminRoleHasPermissions, data);
						}
					});
				} catch (error) {
					throw error;
				}
			}
		);
	}
	async remove(deleteDto: RoleAdminPermissionDeleteDto) {
		return this.adminRoleHasPermissionRepository.manager.transaction(
			async (manager: EntityManager) => {
				try {
					deleteDto.id.forEach(async (element) => {
						await manager.findOneOrFail(AdminRoleHasPermissions, {
							where: { id: element },
						});
						await manager.delete(AdminRoleHasPermissions, element);
					});
				} catch (error) {
					throw error;
				}
			}
		);
	}
}

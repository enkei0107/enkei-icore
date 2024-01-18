/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permissions } from "../../database/entities/permission.entity";
import { Repository } from "typeorm";
import { Request as ExpressRequest, Router } from "express";
import { AdminRoleHasPermissions } from "../../database/entities/admin-role-has-permission.entity";

@Injectable()
export class PermissionService {
	constructor(
		@InjectRepository(Permissions)
		private readonly permissionRepository: Repository<Permissions>,

		@InjectRepository(AdminRoleHasPermissions)
		private readonly adminRoleHasPermission: Repository<AdminRoleHasPermissions>
	) {}

	async get() {
		return await this.permissionRepository.find({
			order: {
				end_point: "ASC",
			},
		});
	}
	async findRoleHasPermissionByName(permission: string, role_id: string) {
		return await this.adminRoleHasPermission.findOne({
			relations:{
				permission:true,
			},
			where: {
				role_id: role_id,
				permission: {
					end_point: permission,
				},
			},
		});
	}
	async synchronized(req: ExpressRequest) {
		try {
			const routeList = await this.getRouteList(req);

			for (const route of routeList.routes) {
				const existingPermission = await this.permissionRepository.findOne({
					where: {
						end_point: route,
					},
				});

				if (existingPermission) {
					await this.permissionRepository.save(existingPermission);
				} else {
					const data = this.permissionRepository.create({
						end_point: route,
					});
					await this.permissionRepository.save(data);
				}
			}
		} catch (error) {
			throw error;
		}
	}

	protected async getRouteList(
		req: ExpressRequest
	): Promise<{ routes: Array<string> }> {
		try {
			const router = req.app._router as Router;
			const routes = router.stack
				.map((layer) => {
					if (layer.route) {
						const path = layer.route?.path;
						const method = layer.route?.stack[0].method;
						return `${method.toUpperCase()} ${path}`;
					}
				})
				.filter((item) => item !== undefined);

			return { routes };
		} catch (error) {
			throw error;
		}
	}
}

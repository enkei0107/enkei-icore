/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permissions } from "../../database/entities/permission.entity";
import { Repository } from "typeorm";
import { Request as ExpressRequest, Router } from 'express';

@Injectable()
export class PermissionService {
	constructor(
		@InjectRepository(Permissions)
		private readonly permissionRepository: Repository<Permissions>
	) {}

	async get() {
		return await this.permissionRepository.find({
			order: {
				end_point: "ASC",
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

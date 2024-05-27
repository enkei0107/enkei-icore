/** @format */

import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionService } from "../../back-office/permission/permission.service";
import { Permissions } from "../decorator/permission.decorator";

@Injectable()
export class PermissionGuard implements CanActivate {
	private permissionService: PermissionService;
	constructor(
		private reflector: Reflector,
		permissionService: PermissionService
	) {
		this.permissionService = permissionService;
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const permission = await this.permissionService.findRoleHasPermissionByName(
			this.reflector.get(Permissions, context.getHandler())[0],
			user?.admin_role?.role?.id
		);
		return permission ? true : false;
	}
}

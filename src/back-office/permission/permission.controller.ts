/** @format */

import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { PermissionService } from "./permission.service";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import {
	ShowPermissionItem,
	ShowPermissionItemSwagger,
} from "./response/show-permission.response";
import { Request as ExpressRequest } from "express";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../config/decorator/permission.decorator";
import { PermissionGuard } from "../../config/guard/permission.guard";

@Controller("backoffice/permissions")
@ApiTags("Back Office - Permissions")
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@Get()
	@ApiOperation({ summary: "Show Permissions" })
	@ApiBearerAuth()
	@ApiResponse({ type: ShowPermissionItemSwagger })
	@Permissions(["GET /backoffice/permissions"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	async get() {
		try {
			const permissions = await this.permissionService.get();
			const mappedPermissions = permissions.map(
				(permission) =>
					({
						id: permission.id,
						end_point: permission.end_point,
						created_at: permission.created_at,
						updated_at: permission.updated_at,
					} as ShowPermissionItem)
			);

			return mappedPermissions;
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
	@Post()
	@ApiOperation({ summary: "Synchronized Permission Endpoint" })
	@ApiBearerAuth()
	// @Permissions(["POST /backoffice/permissions"])
	@UseGuards(AuthGuard("admin-jwt"))
	@ApiResponse({})
	async synchronized(@Request() req: ExpressRequest) {
		try {
			await this.permissionService.synchronized(req);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

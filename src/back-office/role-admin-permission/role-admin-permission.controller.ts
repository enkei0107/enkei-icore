/** @format */

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleAdminPermissionService } from "./role-admin-permission.service";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import {
	RoleAdminPermissionPaginateResponseSchema,
	RoleAdminPermissionPaginateResponseSchemaSwagger,
} from "./response/role-admin-permission-paginate.response";
import { AuthGuard } from "@nestjs/passport";
import {
	RoleAdminPermissionCreateDto,
	RoleAdminPermissionCreateDtoSchema,
} from "./dto/role-admin-permission-create.dto";
import { zodToOpenAPI } from "nestjs-zod";
import {
	RoleAdminPermissionDeleteDto,
	RoleAdminPermissionDeleteDtoSchema,
} from "./dto/role-admin-permission-delete.dto";
import { Permissions } from "../../config/decorator/permission.decorator";
import { PermissionGuard } from "../../config/guard/permission.guard";

@Controller("backoffice/role-admin-permissions")
@ApiTags("Back Office - Admin Role Has Permission")
export class RoleAdminPermissionController {
	constructor(
		private readonly roleAdminPermissionService: RoleAdminPermissionService
	) {}

	@Get(":role_id")
	@Permissions(["GET /backoffice/role-admin-permissions/:role_id"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiBearerAuth()
	@ApiResponse({ type: RoleAdminPermissionPaginateResponseSchemaSwagger })
	async paginate(
		@Paginate() query: PaginateQuery,
		@Param("role_id") role_id: string
	) {
		try {
			const data = await this.roleAdminPermissionService.paginate(
				query,
				role_id
			);
			return new RoleAdminPermissionPaginateResponseSchema(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Post()
	@Permissions(["POST /backoffice/role-admin-permissions"])
	@UseGuards(AuthGuard("admin-jwt"))
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(RoleAdminPermissionCreateDtoSchema) })
	@ApiResponse({})
	async create(@Body() createDto: RoleAdminPermissionCreateDto) {
		const payload = RoleAdminPermissionCreateDtoSchema.parse(createDto);
		try {
			await this.roleAdminPermissionService.create(payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete()
	@Permissions(["DELETE /backoffice/role-admin-permissions"])
	@UseGuards(AuthGuard("admin-jwt"))
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(RoleAdminPermissionDeleteDtoSchema) })
	async remove(@Body() deleteDto: RoleAdminPermissionDeleteDto) {
		const payload = RoleAdminPermissionDeleteDtoSchema.parse(deleteDto);
		try {
			await this.remove(payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

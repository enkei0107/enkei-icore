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
	Put,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleAdminService } from "./role-admin.service";
import {
	RoleAdminCreateDto,
	RoleAdminCreateDtoSchema,
} from "./dto/role-admin-create.dto";
import { zodToOpenAPI } from "nestjs-zod";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import {
	RoleAdminPaginateResponse,
	RoleAdminPaginateResponseSwagger,
} from "./response/role-admin-paginate.response";
import { Permissions } from "../../config/decorator/permission.decorator";
import { AuthGuard } from "@nestjs/passport";
import { PermissionGuard } from "../../config/guard/permission.guard";

@Controller("backoffice/role-admin")
@ApiTags("Back Office - Role Admin")
export class RoleAdminController {
	constructor(private readonly roleService: RoleAdminService) {}

	@Get()
	@Permissions(["GET /backoffice/role-admin"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiBearerAuth()
	@ApiResponse({ type: RoleAdminPaginateResponseSwagger })
	async paginate(@Paginate() query: PaginateQuery) {
		try {
			const data = await this.roleService.paginate(query);
			return new RoleAdminPaginateResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
	@Post()
	@Permissions(["POST /backoffice/role-admin"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(RoleAdminCreateDtoSchema) })
	async create(@Body() createDto: RoleAdminCreateDto) {
		const payload = RoleAdminCreateDtoSchema.parse(createDto);
		try {
			await this.roleService.create(payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
	@Put(":id")
	@Permissions(["PUT /backoffice/role-admin/:id"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(RoleAdminCreateDtoSchema) })
	async update(@Body() updateDto: RoleAdminCreateDto, @Param("id") id: string) {
		const payload = RoleAdminCreateDtoSchema.parse(updateDto);
		try {
			await this.roleService.update(id, payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@Permissions(["DELETE /backoffice/role-admin/:id"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiBearerAuth()
	async remove(@Param("id") id: string) {
		try {
			await this.roleService.remove(id);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

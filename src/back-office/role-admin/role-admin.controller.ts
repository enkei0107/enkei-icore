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
} from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
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

@Controller("backoffice/role-admin")
@ApiTags("Back Office - Role Admin")
export class RoleAdminController {
	constructor(private readonly roleService: RoleAdminService) {}

	@Get()
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
	async remove(@Param("id") id: string) {
		try {
			await this.roleService.remove(id);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

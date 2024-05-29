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
	Request,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminProfileService } from "./admin-profile.service";
import { AuthGuard } from "@nestjs/passport";
import {
	AdminProfileUpdateDto,
	AdminProfileUpdateDtoSchema,
} from "./dto/admin-profile-update.dto";
import { zodToOpenAPI } from "nestjs-zod";
import {
	AdminItemResponse,
	AdminPaginateResponse,
	AdminPaginateResponseSwagger,
} from "./response/admin-paginate.response";
import { AdminProfileResponseSwagger } from "./response/admin-profile.response";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import { Permissions } from "../../config/decorator/permission.decorator";
import { PermissionGuard } from "../../config/guard/permission.guard";
import { AdminUpdateDto } from "./dto/admin-update.dto";

@Controller("backoffice/admin")
@ApiTags("Back Office - Admin Profile")
export class AdminProfileController {
	constructor(private readonly adminProfileService: AdminProfileService) {}
	@Get()
	@ApiBearerAuth()
	@Permissions(["GET /backoffice/admin"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiResponse({ type: AdminPaginateResponseSwagger })
	async adminPaginate(@Paginate() query: PaginateQuery) {
		try {
			const data = await this.adminProfileService.adminPaginate(query);
			return new AdminPaginateResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Put(":id")
	@ApiBearerAuth()
	@Permissions(["PUT /backoffice/admin/:id"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiResponse({})
	async adminShow(@Param("id") id: string, updateDto: AdminUpdateDto) {
		try {
			await this.adminProfileService.adminUpdate(id, updateDto);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@ApiBearerAuth()
	@Permissions(["DELETE /backoffice/admin/:id"])
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiResponse({})
	async adminRemove(@Param("id") id: string) {
		try {
			await this.adminProfileService.adminRemove(id);
			return;
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Get("profile")
	@ApiBearerAuth()
	@UseGuards(AuthGuard("admin-jwt"))
	@ApiResponse({ type: AdminProfileResponseSwagger })
	async getProfile(id: string, @Request() req) {
		try {
			const data = await this.adminProfileService.getProfile(req?.user?.id);
			return new AdminItemResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Post("profile")
	@ApiBearerAuth()
	@UseGuards(AuthGuard("admin-jwt"))
	@ApiBody({ schema: zodToOpenAPI(AdminProfileUpdateDtoSchema) })
	@ApiResponse({})
	async updateProfile(
		@Body() updateDto: AdminProfileUpdateDto,
		@Request() req
	) {
		const payload = AdminProfileUpdateDtoSchema.parse(updateDto);
		try {
			await this.adminProfileService.updateProfile(req?.user?.id, payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

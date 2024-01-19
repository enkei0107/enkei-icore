/** @format */

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Put,
	UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import {
	UserPaginateResponse,
	UserPaginateResponseSwagger,
} from "./response/user-paginate.response";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Permissions } from "../../config/decorator/permission.decorator";
import { AuthGuard } from "@nestjs/passport";
import { PermissionGuard } from "../../config/guard/permission.guard";
import { UserShowDtoResponse, UserShowDtoResponseSwagger } from "./response/user-show.response";
import { UserUpdateDto, UserUpdateDtoSchema } from "./dto/user-update.dto";
import { zodToOpenAPI } from "nestjs-zod";

@Controller("backoffice/users")
@ApiTags("Back Office - Users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Permissions(["GET /backoffice/users"])
	@ApiBearerAuth()
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiResponse({ type: UserPaginateResponseSwagger })
	async paginate(@Paginate() query: PaginateQuery) {
		try {
			const data = await this.userService.paginate(query);
			return new UserPaginateResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(":id")
	@Permissions(["GET /backoffice/users/:id"])
	@ApiBearerAuth()
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiResponse({ type: UserShowDtoResponseSwagger })
	async get(@Param("id") id: string) {
		try {
			const data = await this.userService.findOneById(id);
			return new UserShowDtoResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Put(":id")
	@Permissions(["PUT /backoffice/users/:id"])
	@ApiBearerAuth()
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	@ApiBody({ schema: zodToOpenAPI(UserUpdateDtoSchema) })
	async update(@Param("id") id: string, @Body() updateDto: UserUpdateDto) {
		try {
			await this.userService.updateStatusUser(id, updateDto);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@Permissions(["DELETE /backoffice/users/:id"])
	@ApiBearerAuth()
	@UseGuards(AuthGuard("admin-jwt"), PermissionGuard)
	async remove(@Param("id") id: string) {
		try {
			await this.userService.remove(id);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

/** @format */

import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import {
	AdminRegisterDto,
	AdminRegisterDtoSchema,
} from "./dto/admin-register.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { zodToOpenAPI } from "nestjs-zod";
import {
	AdminAuthResponse,
	AdminAuthResponseSchemaSwagger,
} from "./response/admin-auth.response";
import { AdminLoginDto, AdminLoginDtoSchema } from "./dto/admin-login.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("backoffice/auth")
@ApiTags("Back Office - Auth")
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
		private readonly jwtService: JwtService
	) {}

	@Post("register")
	@ApiBody({ schema: zodToOpenAPI(AdminRegisterDtoSchema) })
	@ApiResponse({ type: AdminAuthResponseSchemaSwagger })
	async register(@Body() registerDto: AdminRegisterDto) {
		const payload = AdminRegisterDtoSchema.parse(registerDto);
		try {
			const user = await this.adminService.register(payload);
			const token = this.jwtService.sign({ sub: user.id });
			return new AdminAuthResponse({ token, user });
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
	@Post("login")
	@ApiBody({schema:zodToOpenAPI(AdminLoginDtoSchema)})
	@ApiResponse({ type: AdminAuthResponseSchemaSwagger })
	async login(@Body() loginDto: AdminLoginDto) {
		const payload = AdminLoginDtoSchema.parse(loginDto);
		try {
			const user = await this.adminService.login(payload);
			const token = this.jwtService.sign({ sub: user.id });
			return new AdminAuthResponse({ token, user });
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

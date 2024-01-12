/** @format */

import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import {
	AuthRegisterDto,
	AuthRegisterDtoSchema,
} from "./dto/auth-register.dto";
import {
	AuthDtoResponse,
	AuthResponseDtoSchemaSwagger,
} from "./response/auth.response";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { zodToOpenAPI } from "nestjs-zod";
import { AuthLoginDto, AuthLoginDtoSchema } from "./dto/auth-login.dto";
import { AuthOauth2Dto, AuthOauth2DtoSchema } from "./dto/auth-oauth2.dto";

@Controller("api/auth")
@ApiTags("Front Office - Auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService
	) {}

	@Post("register")
	@ApiOperation({ summary: "User Register" })
	@ApiBody({ schema: zodToOpenAPI(AuthRegisterDtoSchema) })
	@ApiResponse({ type: AuthResponseDtoSchemaSwagger })
	async register(@Body() registerDto: AuthRegisterDto) {
		const payload = AuthRegisterDtoSchema.parse(registerDto);
		try {
			const user = await this.authService.register(payload);
			const token = this.jwtService.sign({ sub: user.id });
			return new AuthDtoResponse({ token, user });
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Post("login")
	@ApiOperation({ summary: "User login" })
	@ApiBody({ schema: zodToOpenAPI(AuthLoginDtoSchema) })
	@ApiResponse({ type: AuthResponseDtoSchemaSwagger })
	async login(@Body() loginDto: AuthLoginDto) {
		const payload = AuthLoginDtoSchema.parse(loginDto);
		try {
			const user = await this.authService.login(payload);
			const token = this.jwtService.sign({ sub: user.id });
			return new AuthDtoResponse({ token, user });
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
	@Post("oauth")
	@ApiOperation({summary:"User Oauth"})
	@ApiBody({schema:zodToOpenAPI(AuthOauth2DtoSchema)})
	@ApiResponse({ type: AuthResponseDtoSchemaSwagger })
	async oauth(
		@Body() oauthDto:AuthOauth2Dto,
	){
		const payload = AuthOauth2DtoSchema.parse(oauthDto);
		try {
			const user = await this.authService.oauth2(payload);
			const token = this.jwtService.sign({ sub: user.id });
			return new AuthDtoResponse({ token, user });
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

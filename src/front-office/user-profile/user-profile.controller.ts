/** @format */

import {
	Body,
	Controller,
	Post,
	UseGuards,
	Request,
	HttpException,
	HttpStatus,
	Get,
} from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
	UserProfileCreateDto,
	UserProfileCreateDtoSchema,
} from "./dto/user-profile-create.dto";
import { zodToOpenAPI } from "nestjs-zod";
import {
	UserProfileDtoResponse,
	UserProfileDtoResponseSchemaSwagger,
} from "./response/user-profile.response";

@Controller("api/me")
@ApiTags("Front Office - Me")
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@Post()
	@UseGuards(AuthGuard("jwt"))
	@ApiOperation({ summary: "Update Profile" })
    @ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(UserProfileCreateDtoSchema) })
	async create(@Body() profileDto: UserProfileCreateDto, @Request() req) {
		const payload = UserProfileCreateDtoSchema.parse(profileDto);
		try {
			await this.userProfileService.updateOrCreate(payload, req?.user);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	@ApiOperation({ summary: "Get Profile" })
    @ApiBearerAuth()
	@ApiResponse({ type: UserProfileDtoResponseSchemaSwagger })
	async findOneByOrFail(@Request() req): Promise<UserProfileDtoResponse> {
		try {
			const data = await this.userProfileService.findOneByOrFail(req?.user);
			return new UserProfileDtoResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

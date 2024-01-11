/** @format */

import {
	Body,
	Controller,
	Post,
	UseGuards,
	Request,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { UserAddressService } from "./user-address.service";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { zodToOpenAPI } from "nestjs-zod";
import {
	UserAddressCreateDto,
	UserAddressCreateDtoSchema,
} from "./dto/user-address-create.dto";

@Controller("api/me/address")
@ApiTags("Front Office - Me")
export class UserAddressController {
	constructor(private readonly userAddressService: UserAddressService) {}

	@Post()
	@UseGuards(AuthGuard("jwt"))
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(UserAddressCreateDtoSchema) })
	@ApiResponse({})
	async updateOrCreate(
		@Body() createDto: UserAddressCreateDto,
		@Request() req
	) {
		const payload = UserAddressCreateDtoSchema.parse(createDto);
		try {
			await this.userAddressService.updateOrCreate(req?.user, payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

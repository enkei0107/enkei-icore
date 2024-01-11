/** @format */

import {
	Body,
	Controller,
	Delete,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	Request,
	UseGuards,
} from "@nestjs/common";
import { UserContactService } from "./user-contact.service";
import {
	UserContactCreateDto,
	UserContactCreateDtoSchema,
} from "./dto/user-contact-create.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { zodToOpenAPI } from "nestjs-zod";
import {
	UserContactUpdateDto,
	UserContactUpdateDtoSchema,
} from "./dto/user-contact-update.dto";

@Controller("api/me/contacts")
@ApiTags("Front Office - Me")
export class UserContactController {
	constructor(private readonly userContactService: UserContactService) {}

	@Post()
	@UseGuards(AuthGuard("jwt"))
	@ApiOperation({ summary: "Store Contact" })
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(UserContactCreateDtoSchema) })
	async create(@Body() createDto: UserContactCreateDto, @Request() req) {
		const payload = UserContactCreateDtoSchema.parse(createDto);
		try {
			await this.userContactService.create(payload, req?.user);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Put(":id")
	@UseGuards(AuthGuard("jwt"))
	@ApiOperation({ summary: "Update Contact" })
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(UserContactUpdateDtoSchema) })
	async update(
		@Param("id") id: string,
		@Body() updateDto: UserContactUpdateDto,
		@Request() req
	) {
		const payload = UserContactUpdateDtoSchema.parse(updateDto);
		try {
			await this.userContactService.update(id, payload, req?.user);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@UseGuards(AuthGuard("jwt"))
	@ApiOperation({ summary: "Delete Contact" })
	@ApiBearerAuth()
	async remove(@Param("id") id: string, @Request() req) {
		try {
			await this.userContactService.remove(id, req?.user);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

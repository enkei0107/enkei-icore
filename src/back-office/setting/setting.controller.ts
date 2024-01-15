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
import { SettingService } from "./setting.service";
import {
	SettingCreateDto,
	SettingCreateDtoSchema,
} from "./dto/setting-create.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { zodToOpenAPI } from "nestjs-zod";
import {
	SettingUpdateDto,
	SettingUpdateDtoSchema,
} from "./dto/setting-update.dto";
import {
	SettingShowResponse,
	SettingShowResponseSwagger,
} from "./response/setting-show.response";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import { SettingsPaginateResponse } from "./response/setting-paginate.response";

@Controller("backoffice/setting")
@ApiTags("Back Office - Settings")
export class SettingController {
	constructor(private readonly settingService: SettingService) {}

	@Post()
	@ApiBody({ schema: zodToOpenAPI(SettingCreateDtoSchema) })
	@ApiResponse({})
	async create(@Body() createDto: SettingCreateDto) {
		const payload = SettingCreateDtoSchema.parse(createDto);
		try {
			await this.settingService.create(payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Put(":id")
	@ApiBody({ schema: zodToOpenAPI(SettingUpdateDtoSchema) })
	@ApiResponse({})
	async update(@Param("id") id: string, @Body() updateDto: SettingUpdateDto) {
		const payload = SettingUpdateDtoSchema.parse(updateDto);
		try {
			await this.settingService.update(id, payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	async paginate(
		@Paginate() query:PaginateQuery
	){
		try {
			const data = await this.settingService.paginate(query);
			return new SettingsPaginateResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(":id")
	@ApiResponse({ type: SettingShowResponseSwagger })
	async show(@Param("id") id: string) {
		try {
			const data = await this.settingService.findOneByIdOrFail(id);
			return new SettingShowResponse(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@ApiResponse({})
	async remove(@Param("id") id: string) {
		try {
			await this.settingService.remove(id);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

/** @format */

import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
	UseGuards,
	Request,
	Get,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserBankService } from "./user-bank.service";
import { AuthGuard } from "@nestjs/passport";
import {
	UserBankCreateDto,
	UserBankCreateDtoSchema,
} from "./dto/user-bank-create.dto";
import { zodToOpenAPI } from "nestjs-zod";
import {
    UserBankItemResponseSchema,
	UserBankPaginateResponseSchema,
	UserBankPaginateResponseSchemaSwagger,
} from "./response/user-bank-paginate.response";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import {
	UserBankUpdateDto,
	UserBankUpdateDtoSchema,
} from "./dto/user-bank-update.dto";
import { UserBankShowResponseSchemaSwagger } from "./response/user-bank-show.response";

@Controller("api/user-banks")
@ApiTags("Front Office - User bank")
export class UserBankController {
	constructor(private readonly userBankService: UserBankService) {}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	@ApiBearerAuth()
	@ApiResponse({ type: UserBankPaginateResponseSchemaSwagger })
	async get(@Request() req, @Paginate() query: PaginateQuery) {
		try {
			const data = await this.userBankService.paginate(query, req?.user?.id);
			return new UserBankPaginateResponseSchema(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

    @Get(":id")
    @UseGuards(AuthGuard("jwt"))
	@ApiBearerAuth()
	@ApiResponse({ type: UserBankShowResponseSchemaSwagger })
    async show(
        @Request() req,
        @Param("id")id:string 
    ){
        try {
            const data = await this.userBankService.show(id,req?.user?.id);
            return new UserBankItemResponseSchema(data);
        } catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

	@Post()
	@UseGuards(AuthGuard("jwt"))
	@ApiBody({ schema: zodToOpenAPI(UserBankCreateDtoSchema) })
	@ApiBearerAuth()
	@ApiResponse({})
	async create(@Body() createDto: UserBankCreateDto, @Request() req) {
		const payload = UserBankCreateDtoSchema.parse(createDto);
		try {
			await this.userBankService.create(payload, req?.user?.id);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch(":id")
	@UseGuards(AuthGuard("jwt"))
	@ApiBody({ schema: zodToOpenAPI(UserBankUpdateDtoSchema) })
	@ApiBearerAuth()
	@ApiResponse({})
	async update(
		@Body() updateDto: UserBankUpdateDto,
		@Param("id") id: string,
		@Request() req
	) {
		const payload = UserBankUpdateDtoSchema.parse(updateDto);
		try {
			await this.userBankService.update(id, req?.user?.id, payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@UseGuards(AuthGuard("jwt"))
	@ApiBearerAuth()
	@ApiResponse({})
	async remove(@Param("id") id: string, @Request() req) {
		try {
			await this.userBankService.remove(id,req?.user?.id);
            return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

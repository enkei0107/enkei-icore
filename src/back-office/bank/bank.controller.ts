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
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BankService } from "./bank.service";
import { AuthGuard } from "@nestjs/passport";
import { zodToOpenAPI } from "nestjs-zod";
import { BankCreateDto, BankCreateDtoSchema } from "./dto/bank-create.dto";
import { BankUpdateDto, BankUpdateDtoSchema } from "./dto/bank-update.dto";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import { BankItemsResponseSchema, BankPaginateResponseSchema, BankPaginateResponseSchemaSwagger } from "./response/bank-paginate.response";
import { BankQuerySchema } from "./query/bank-query";
import { Permissions } from "../../config/decorator/permission.decorator";
import { PermissionGuard } from "../../config/guard/permission.guard";
import { BankShowResponseSchemaSwagger } from "./response/bank-show.response";

@Controller("backoffice/banks")
@ApiTags("Back Office - Banks")
export class BankController {
	constructor(private readonly bankService: BankService) {}

    @Get()
    @Permissions(["GET /backoffice/banks"])
    @UseGuards(AuthGuard("admin-jwt"),PermissionGuard)
	@ApiBearerAuth()
    @ApiQuery({type:BankQuerySchema})
    @ApiResponse({type:BankPaginateResponseSchemaSwagger})
    async paginate(
        @Paginate() query:PaginateQuery
    ){
        try {
            const data = await this.bankService.paginate(query);
            return new BankPaginateResponseSchema(data);
        } catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(":id")
    @Permissions(["GET /backoffice/banks/:id"])
    @UseGuards(AuthGuard("admin-jwt"),PermissionGuard)
	@ApiBearerAuth()
    @ApiResponse({type:BankShowResponseSchemaSwagger})
    async show(
        @Param("id")id:string
    ){
        try {
            const data = await this.bankService.show(id);
            return new BankItemsResponseSchema(data);
        } catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

	@Post()
	@Permissions(["POST /backoffice/banks"])
    @UseGuards(AuthGuard("admin-jwt"),PermissionGuard)
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(BankCreateDtoSchema) })
	@ApiResponse({})
	async create(@Body() createDto: BankCreateDto) {
		const payload = BankCreateDtoSchema.parse(createDto);
		try {
			await this.bankService.create(payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Put(":id")
	@Permissions(["PUT /backoffice/banks/:id"])
    @UseGuards(AuthGuard("admin-jwt"),PermissionGuard)
	@ApiBearerAuth()
	@ApiBody({ schema: zodToOpenAPI(BankCreateDtoSchema) })
	@ApiResponse({})
	async update(@Param("id") id: string, @Body() updateDto: BankUpdateDto) {
		const payload = BankUpdateDtoSchema.parse(updateDto);
		try {
			await this.bankService.update(id, payload);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
    @Permissions(["DELETE /backoffice/banks/:id"])
    @UseGuards(AuthGuard("admin-jwt"),PermissionGuard)
	@ApiBearerAuth()
    @ApiResponse({})
	async remove(@Param("id") id: string) {
		try {
			await this.bankService.remove(id);
			return {};
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}

import { ApiProperty } from "@nestjs/swagger";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";
import { BankItemsResponseSchema } from "./bank-paginate.response";

export class BankShowResponseSchemaSwagger{
    @ApiProperty({type:ResponseMetaSwagger})
    meta:ResponseMetaSwagger;

    @ApiProperty({type:BankItemsResponseSchema})
    data:BankItemsResponseSchema;
}
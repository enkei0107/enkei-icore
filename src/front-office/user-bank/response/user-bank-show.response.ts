import { ApiProperty } from "@nestjs/swagger";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";
import { UserBankItemResponseSchema } from "./user-bank-paginate.response";

export class UserBankShowResponseSchemaSwagger{
    @ApiProperty({type:ResponseMetaSwagger})
    meta:ResponseMetaSwagger;
    
    @ApiProperty({type:UserBankItemResponseSchema})
    data:UserBankItemResponseSchema;
}

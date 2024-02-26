/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { ResponseQuerySwagger } from "../../../config/response/response.query";

export class BankQuerySchema extends ResponseQuerySwagger {
	@ApiProperty({ required: false })
	"filter.name": string;
    
	@ApiProperty({ required: false })
    "filter.code":string;
}

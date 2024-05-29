/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";
import { AdminItemResponse } from "./admin-paginate.response";

export class AdminProfileResponseSwagger {
	@ApiProperty()
	meta: ResponseMetaSwagger;

	@ApiProperty()
	data: AdminItemResponse;
}
